import { NextResponse } from "next/server";

/**
 * /api/youtube/route.ts
 *
 * Server-side scaffold to fetch YouTube playlist items using the YouTube Data API v3.
 *
 * Environment variable:
 *   - YOUTUBE_API_KEY  (required) — API key with access to YouTube Data API v3
 *
 * Query parameters:
 *   - playlistId (required): YouTube playlist ID to fetch items from
 *   - maxResults (optional): number of items to return (default: 10, max: 50)
 *   - pageToken  (optional): pass-through token for paginated requests
 *   - includeDetails (optional): "1" to fetch additional video details (contentDetails, statistics)
 *
 * Notes:
 *  - This endpoint uses an API key and returns only public data.
 *  - For production, store YOUTUBE_API_KEY securely in Netlify/Vercel/host environment variables.
 *  - Simple in-memory caching is used (stored on globalThis) to reduce external API calls.
 */

/* ------------------------------- Types ---------------------------------- */

type PlaylistItemSnippet = {
  publishedAt: string;
  title: string;
  description: string;
  thumbnails?: Record<string, { url: string; width?: number; height?: number }>;
  resourceId?: { kind?: string; videoId?: string };
  channelTitle?: string;
};

type PlaylistItem = {
  id: string;
  snippet: PlaylistItemSnippet;
};

type VideoDetails = {
  id: string;
  contentDetails?: {
    duration?: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
};

type SimpleItem = {
  playlistItemId: string;
  videoId?: string;
  title: string;
  description: string;
  thumbnails?: Record<string, { url: string; width?: number; height?: number }>;
  publishedAt?: string;
  channelTitle?: string;
  // optional details if includeDetails=true
  duration?: string | null;
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  } | null;
};

type PlaylistResponsePayload = {
  playlistId: string;
  items: SimpleItem[];
  nextPageToken?: string | null;
  prevPageToken?: string | null;
  totalResults?: number | null;
  fetchedAt: string;
};

/* --------------------------- Simple Cache --------------------------------
   In-memory cache stored on globalThis so it can be reused between Lambda
   invocations where supported. Each entry has an expiresAt timestamp.
------------------------------------------------------------------------- */

type CacheEntry<T> = {
  expiresAt: number;
  data: T;
};

const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

function getCacheKey(
  playlistId: string,
  maxResults: number,
  pageToken?: string,
  includeDetails?: boolean,
) {
  return `yt_playlist::${playlistId}::max=${maxResults}::page=${pageToken ?? "0"}::details=${includeDetails ? "1" : "0"}`;
}

function getEnv(name: string): string | undefined {
  return process.env[name];
}

/* ---------------------------- Fetch Helpers ------------------------------ */

async function fetchJson(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err: Error & { status?: number } = new Error(
      `Fetch failed: ${res.status} ${res.statusText} ${text}`,
    );
    err.status = res.status;
    throw err;
  }
  return res.json();
}

/**
 * Fetch playlist items (playlistItems.list).
 * We request part=snippet to get title/description/thumbnails/resourceId.
 */
async function fetchPlaylistItemsFromYouTube(
  apiKey: string,
  playlistId: string,
  maxResults = 10,
  pageToken?: string,
) {
  const params = new URLSearchParams({
    part: "snippet",
    playlistId,
    maxResults: String(Math.min(50, Math.max(1, maxResults))),
    key: apiKey,
  });
  if (pageToken) params.set("pageToken", pageToken);

  const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`;
  const json = await fetchJson(url);
  return json;
}

/**
 * Optionally fetch video details (videos.list) for multiple videoIds.
 * Request contentDetails and statistics if requested.
 */
async function fetchVideosDetails(
  apiKey: string,
  videoIds: string[],
  parts: string[] = ["contentDetails", "statistics"],
) {
  if (!videoIds.length) return { items: [] };
  const params = new URLSearchParams({
    part: parts.join(","),
    id: videoIds.join(","),
    key: apiKey,
  });
  const url = `https://www.googleapis.com/youtube/v3/videos?${params.toString()}`;
  const json = await fetchJson(url);
  return json;
}

/* ------------------------------ Route Handler ---------------------------- */

export async function GET(req: Request) {
  try {
    const apiKey = getEnv("YOUTUBE_API_KEY");
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing YOUTUBE_API_KEY environment variable." },
        { status: 500 },
      );
    }

    const url = new URL(req.url);
    const playlistId = url.searchParams.get("playlistId");
    const maxResultsParam = url.searchParams.get("maxResults");
    const pageToken = url.searchParams.get("pageToken") || undefined;
    const includeDetailsParam = url.searchParams.get("includeDetails");

    if (!playlistId) {
      return NextResponse.json(
        { error: "Missing required query param: playlistId" },
        { status: 400 },
      );
    }

    const maxResults = maxResultsParam
      ? Math.min(50, Math.max(1, Number(maxResultsParam)))
      : 10;
    const includeDetails =
      includeDetailsParam === "1" || includeDetailsParam === "true";

    // Check cache
    const cacheKey = getCacheKey(
      playlistId,
      maxResults,
      pageToken,
      includeDetails,
    );
    const globalObj = globalThis as unknown as Record<string, unknown>;
    const cached = globalObj[cacheKey] as
      | CacheEntry<PlaylistResponsePayload>
      | undefined;
    const now = Date.now();
    if (cached && cached.expiresAt > now) {
      return NextResponse.json(cached.data, { status: 200 });
    }

    // Fetch playlist items
    const raw = await fetchPlaylistItemsFromYouTube(
      apiKey,
      playlistId,
      maxResults,
      pageToken,
    );

    // raw.items is an array of playlist items
    const items: PlaylistItem[] = Array.isArray(raw.items) ? raw.items : [];

    // Collect videoIds to optionally fetch details
    const videoIds: string[] = [];
    for (const it of items) {
      const vid = it?.snippet?.resourceId?.videoId;
      if (vid) videoIds.push(vid);
    }

    let videoDetailsMap: Map<string, VideoDetails> | null = null;
    if (includeDetails && videoIds.length > 0) {
      const videosJson = await fetchVideosDetails(apiKey, videoIds, [
        "contentDetails",
        "statistics",
      ]);
      const videoItems: VideoDetails[] = Array.isArray(videosJson.items)
        ? videosJson.items
        : [];
      videoDetailsMap = new Map(videoItems.map((v) => [v.id, v]));
    }

    // Build simplified items
    const simplified: SimpleItem[] = items.map((pi) => {
      const sn = pi.snippet;
      const videoId = sn?.resourceId?.videoId;
      const details = videoDetailsMap?.get(videoId ?? "") ?? null;
      const simple: SimpleItem = {
        playlistItemId: pi.id,
        videoId: videoId ?? undefined,
        title: sn?.title ?? "",
        description: sn?.description ?? "",
        thumbnails: sn?.thumbnails ?? undefined,
        publishedAt: sn?.publishedAt ?? undefined,
        channelTitle: sn?.channelTitle ?? undefined,
        duration:
          (details &&
            details.contentDetails &&
            (details.contentDetails.duration ?? null)) ||
          null,
        statistics: (details && details.statistics) || null,
      };
      return simple;
    });

    const payload: PlaylistResponsePayload = {
      playlistId,
      items: simplified,
      nextPageToken: raw.nextPageToken ?? null,
      prevPageToken: raw.prevPageToken ?? null,
      totalResults: raw.pageInfo?.totalResults ?? null,
      fetchedAt: new Date().toISOString(),
    };

    // Cache result for short period
    globalObj[cacheKey] = {
      expiresAt: Date.now() + CACHE_TTL_MS,
      data: payload,
    } as CacheEntry<PlaylistResponsePayload>;

    return NextResponse.json(payload, { status: 200 });
  } catch (err: unknown) {
    // Don't leak secrets in errors
    console.error("[/api/youtube] error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
