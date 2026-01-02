import { NextResponse } from "next/server";

/**
 * /api/spotify/route.ts
 *
 * Server-side scaffold to integrate with Spotify using the Client Credentials flow.
 *
 * - Expects environment variables:
 *    SPOTIFY_CLIENT_ID
 *    SPOTIFY_CLIENT_SECRET
 *    (optional) SPOTIFY_DEFAULT_PLAYLIST_ID
 *
 * - GET params:
 *    ?playlistId=<spotify-playlist-id>  - fetch playlist tracks (default: SPOTIFY_DEFAULT_PLAYLIST_ID)
 *    ?limit=<number>                    - page size for playlist tracks (default: 50)
 *    ?offset=<number>                   - offset for playlist paging (default: 0)
 *
 * Notes:
 * - This endpoint uses server-side client credentials (no user login). Only public data accessible via client credentials is available.
 * - For production, ensure your SPOTIFY_CLIENT_SECRET is stored securely (Netlify/Vercel env vars).
 * - This file implements basic in-memory caching of access tokens and playlist responses to reduce API calls.
 */

/* ----------------------------- Types & Helpers ---------------------------- */

type TokenCache = {
  accessToken: string;
  expiresAt: number; // epoch ms
};

type PlaylistCacheEntry = {
  data: any;
  expiresAt: number;
};

const TOKEN_CACHE_KEY = "__spotify_token_cache_v1";
const PLAYLIST_CACHE_KEY_PREFIX = "__spotify_playlist_cache_v1_";

/**
 * Get Node-style env safely (works both server and test env)
 */
function getEnv(name: string): string | undefined {
  return process.env[name];
}

/* ---------------------------- Token Management ---------------------------- */

/**
 * Get a valid client credentials token from Spotify, cached in-memory.
 */
async function getAccessToken(): Promise<string> {
  const clientId = getEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = getEnv("SPOTIFY_CLIENT_SECRET");

  if (!clientId || !clientSecret) {
    throw new Error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET environment variables.");
  }

  // Store token cache on globalThis so it's reused across Lambda invocations (where possible)
  const globalObj: any = globalThis as any;
  let tokenCache: TokenCache | undefined = globalObj[TOKEN_CACHE_KEY];

  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 1000) {
    return tokenCache.accessToken;
  }

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const body = new URLSearchParams({ grant_type: "client_credentials" });

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Spotify token request failed: ${res.status} ${res.statusText} ${errText}`);
  }

  const json = await res.json();
  const accessToken = json.access_token as string;
  const expiresIn = Number(json.expires_in) || 3600; // seconds

  tokenCache = {
    accessToken,
    expiresAt: Date.now() + expiresIn * 1000,
  };

  globalObj[TOKEN_CACHE_KEY] = tokenCache;
  return accessToken;
}

/* ---------------------------- Playlist Fetching --------------------------- */

/**
 * Build a small cache key for playlist+params
 */
function playlistCacheKey(playlistId: string, limit?: number, offset?: number) {
  return `${PLAYLIST_CACHE_KEY_PREFIX}${playlistId}::limit=${limit ?? 50}::offset=${offset ?? 0}`;
}

/**
 * Simple caching wrapper for playlist responses in-memory.
 * Cache is stored on globalThis to survive cold-starts between requests on some hosts.
 */
async function getPlaylistFromSpotify(
  playlistId: string,
  limit = 50,
  offset = 0,
): Promise<any> {
  const globalObj: any = globalThis as any;
  const key = playlistCacheKey(playlistId, limit, offset);
  const cached: PlaylistCacheEntry | undefined = globalObj[key];

  const now = Date.now();
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const token = await getAccessToken();
  const url = `https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistId)}/tracks?limit=${limit}&offset=${offset}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Spotify playlist request failed: ${res.status} ${res.statusText} ${text}`);
  }

  const data = await res.json();

  // Cache playlist results for a short time (e.g. 2 minutes) to reduce API calls.
  const entry: PlaylistCacheEntry = {
    data,
    expiresAt: Date.now() + 2 * 60 * 1000,
  };
  globalObj[key] = entry;

  return data;
}

/* ------------------------------- Route GET -------------------------------- */

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const playlistIdParam = url.searchParams.get("playlistId") || getEnv("SPOTIFY_DEFAULT_PLAYLIST_ID");
    const limitParam = url.searchParams.get("limit");
    const offsetParam = url.searchParams.get("offset");

    if (!playlistIdParam) {
      return NextResponse.json(
        { error: "Missing 'playlistId' query param and SPOTIFY_DEFAULT_PLAYLIST_ID is not set." },
        { status: 400 },
      );
    }

    const limit = limitParam ? Math.min(100, Math.max(1, Number(limitParam))) : 50;
    const offset = offsetParam ? Math.max(0, Number(offsetParam)) : 0;

    // Fetch playlist tracks from Spotify
    const raw = await getPlaylistFromSpotify(playlistIdParam, limit, offset);

    // Transform to a lighter-weight payload for the client
    const simplifiedItems = (raw.items || []).map((item: any) => {
      const track = item.track || item;
      return {
        id: track.id,
        name: track.name,
        preview_url: track.preview_url,
        external_urls: track.external_urls,
        duration_ms: track.duration_ms,
        explicit: track.explicit,
        artists: (track.artists || []).map((a: any) => ({ id: a.id, name: a.name, external_urls: a.external_urls })),
        album: track.album
          ? {
              id: track.album.id,
              name: track.album.name,
              images: track.album.images,
              external_urls: track.album.external_urls,
            }
          : null,
      };
    });

    const responsePayload = {
      playlistId: playlistIdParam,
      limit,
      offset,
      total: raw.total ?? raw.paging?.total ?? null,
      items: simplifiedItems,
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (err: any) {
    // Don't leak sensitive info — return friendly errors but log details server-side
    console.error("[/api/spotify] error:", err && err.stack ? err.stack : err);
    const message = err?.message || "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
