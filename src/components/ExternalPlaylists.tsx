"use client";

import { useEffect, useState } from "react";
import audioManager, { Track } from "@/lib/audioManager";

/**
 * ExternalPlaylists.tsx
 *
 * UI component that displays external playlists (Spotify + YouTube) and provides
 * actions to sync/populate Spotify preview tracks into the app's audioManager.
 *
 * - Uses project server endpoints:
 *   - /api/spotify?playlistId=<id>
 *   - /api/youtube?playlistId=<id>
 *
 * - Spotify: adds tracks with `preview_url` into audioManager (playable clips).
 * - YouTube: lists items, offers "Open" and optional "Add as link" (YouTube videos are not direct audio streams).
 *
 * Usage:
 *  <ExternalPlaylists
 *    spotifyUrl="https://open.spotify.com/playlist/..."
 *    youtubeUrl="https://music.youtube.com/playlist?list=..."
 *  />
 *
 * Note: Playing tracks requires a user gesture in browsers. The user should click Play in the AudioPlayer to start playback.
 */

/**
 * Strongly-typed helpers for Spotify payload shapes used by this component.
 * - ExternalURLs: a map of provider -> url (e.g. { spotify: "https://..." })
 * - ImageObject: common shape returned by Spotify for album images
 */
type ExternalURLs = Record<string, string>;
type ImageObject = { url: string; height?: number; width?: number };

type SpotifyItem = {
  id: string;
  name: string;
  preview_url: string | null;
  duration_ms?: number;
  artists?: { id?: string; name?: string }[];
  album?: {
    id?: string;
    name?: string;
    images?: ImageObject[];
    external_urls?: ExternalURLs;
  };
  external_urls?: ExternalURLs;
};

type SpotifyPayload = {
  playlistId: string;
  limit?: number;
  offset?: number;
  total?: number | null;
  items: SpotifyItem[];
};

type YouTubeItem = {
  playlistItemId?: string;
  videoId?: string;
  title?: string;
  description?: string;
  thumbnails?: Record<string, { url: string }>;
  publishedAt?: string;
  channelTitle?: string;
  duration?: string | null;
  statistics?: { viewCount?: string } | null;
};

type YouTubePayload = {
  playlistId: string;
  items: YouTubeItem[];
  nextPageToken?: string | null;
  totalResults?: number | null;
  fetchedAt: string;
};

export default function ExternalPlaylists({
  spotifyUrl = "https://open.spotify.com/playlist/7oE9ab5ecrDjpsceNlbTZ9?si=46f83d5a6c2843d5",
  youtubeUrl = "https://music.youtube.com/playlist?list=PLtfzLAsv-NzoeTfHBFCc70lnWS206tgox&si=6W2HS7hGPVmDecAV",
}: {
  spotifyUrl?: string;
  youtubeUrl?: string;
}) {
  const [spotifyLoading, setSpotifyLoading] = useState(false);
  const [spotifyError, setSpotifyError] = useState<string | null>(null);
  const [spotifyPlaylist, setSpotifyPlaylist] = useState<SpotifyPayload | null>(
    null,
  );

  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [youtubeError, setYoutubeError] = useState<string | null>(null);
  const [youtubePlaylist, setYoutubePlaylist] = useState<YouTubePayload | null>(
    null,
  );

  const [lastSyncMessage, setLastSyncMessage] = useState<string | null>(null);

  // Helpers: extract playlist IDs from URLs
  function extractSpotifyPlaylistId(url: string): string | null {
    try {
      const u = new URL(url);
      // path may be /playlist/<id>
      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.indexOf("playlist");
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
      // fallback: if first segment is playlist id
      if (parts.length >= 1) return parts[parts.length - 1];
      return null;
    } catch {
      // not a valid URL, maybe it's just an id
      if (/^[A-Za-z0-9]+$/.test(url)) return url;
      return null;
    }
  }

  function extractYouTubePlaylistId(url: string): string | null {
    try {
      const u = new URL(url);
      // typical param: ?list=PL...
      const list = u.searchParams.get("list");
      if (list) return list;
      // sometimes path includes the id (uncommon), try last segment
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length > 0) return parts[parts.length - 1];
      return null;
    } catch {
      return null;
    }
  }

  // Fetch Spotify playlist via server endpoint
  async function fetchSpotify(playlistId: string) {
    setSpotifyLoading(true);
    setSpotifyError(null);
    setSpotifyPlaylist(null);
    try {
      const res = await fetch(
        `/api/spotify?playlistId=${encodeURIComponent(playlistId)}&limit=50`,
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Spotify API returned ${res.status}`);
      }
      const json = (await res.json()) as SpotifyPayload;
      setSpotifyPlaylist(json);
    } catch (err: unknown) {
      const msg =
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : String(err);
      setSpotifyError(msg);
    } finally {
      setSpotifyLoading(false);
    }
  }

  // Fetch YouTube playlist via server endpoint
  async function fetchYouTube(playlistId: string) {
    setYoutubeLoading(true);
    setYoutubeError(null);
    setYoutubePlaylist(null);
    try {
      const res = await fetch(
        `/api/youtube?playlistId=${encodeURIComponent(playlistId)}&maxResults=50&includeDetails=1`,
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `YouTube API returned ${res.status}`);
      }
      const json = (await res.json()) as YouTubePayload;
      setYoutubePlaylist(json);
    } catch (err: unknown) {
      const msg =
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : String(err);
      setYoutubeError(msg);
    } finally {
      setYoutubeLoading(false);
    }
  }

  // Sync Spotify preview tracks into audioManager
  async function syncSpotifyToAudioManager(playlist: SpotifyPayload) {
    if (!playlist || !Array.isArray(playlist.items)) {
      setLastSyncMessage("No Spotify playlist data to sync.");
      return;
    }

    let added = 0;
    let skipped = 0;

    // Track existing srcs so we don't duplicate
    const existing = new Set(audioManager.getPlaylist().map((t) => t.src));

    for (const item of playlist.items) {
      // preview_url is the short audio clip Spotify exposes (if available)
      const preview = item.preview_url;
      if (preview && !existing.has(preview)) {
        const artistNames = (item.artists || []).map((a) => a.name).join(", ");
        const title = `${item.name} — ${artistNames || "Unknown Artist"}`;
        audioManager.addTrack(preview, title);
        added += 1;
      } else {
        skipped += 1;
      }
    }

    setLastSyncMessage(
      `Spotify sync complete: ${added} added, ${skipped} skipped.`,
    );
    // notify (audioManager emits playlistchange which other components subscribe to)
  }

  // "Add YouTube as links" - YouTube videos are not direct audio streams, this will only add link entries
  // Use with caution: audioManager will try to play the src if added; most browsers won't play a YouTube watch page as audio.
  function addYouTubeLinksToAudioManager(playlist: YouTubePayload) {
    if (!playlist || !Array.isArray(playlist.items)) {
      setLastSyncMessage("No YouTube playlist data to add.");
      return;
    }

    const existing = new Set(audioManager.getPlaylist().map((t) => t.src));
    let added = 0;

    for (const it of playlist.items) {
      const vid = it.videoId;
      if (!vid) continue;
      // Build the watch URL for music.youtube.com / youtube
      const watchUrl = `https://www.youtube.com/watch?v=${vid}`;
      if (!existing.has(watchUrl)) {
        // We add as a normal track — playback may not work. This action is primarily for "publicizing" playlist items in audioManager UI.
        audioManager.addTrack(watchUrl, it.title ?? `YouTube ${vid}`);
        added += 1;
      }
    }
    setLastSyncMessage(`YouTube links added to playlist: ${added} item(s).`);
  }

  // initial fetch when component mounts (fetch metadata for given links)
  useEffect(() => {
    const sId = extractSpotifyPlaylistId(spotifyUrl);
    if (sId) fetchSpotify(sId);
    const yId = extractYouTubePlaylistId(youtubeUrl);
    if (yId) fetchYouTube(yId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyUrl, youtubeUrl]);

  return (
    <section className="max-w-4xl mx-auto p-6 bg-background/60 border border-border/10 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">External Playlists</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Spotify Panel */}
        <div className="p-4 border rounded-lg bg-muted/40">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold">Spotify Playlist</h3>
              <p className="text-sm text-muted-foreground">
                Sync preview clips into the site audio player.
              </p>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div className="mb-1">Source</div>
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                Open in Spotify
              </a>
            </div>
          </div>

          {spotifyLoading ? (
            <div className="text-sm text-muted-foreground">
              Loading Spotify playlist…
            </div>
          ) : spotifyError ? (
            <div className="text-sm text-destructive">
              Error: {spotifyError}
            </div>
          ) : spotifyPlaylist ? (
            <div>
              <div className="mb-3">
                <div className="text-sm text-muted-foreground mb-1">
                  Playlist ID:{" "}
                  <span className="font-mono text-xs">
                    {spotifyPlaylist.playlistId}
                  </span>
                </div>
                <div className="text-sm">
                  Tracks: {spotifyPlaylist.items.length}
                  {spotifyPlaylist.total
                    ? ` (total ${spotifyPlaylist.total})`
                    : ""}
                </div>
              </div>

              <div className="space-y-2 max-h-48 overflow-auto mb-3">
                {spotifyPlaylist.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded hover:bg-accent/5"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {(item.artists || []).map((a) => a.name).join(", ")}
                      </div>
                    </div>
                    <div className="ml-3 text-xs">
                      {item.preview_url ? (
                        <span className="text-green-500">
                          Preview available
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          No preview
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => syncSpotifyToAudioManager(spotifyPlaylist)}
                  type="button"
                >
                  Sync preview clips to player
                </button>
                <button
                  className="px-3 py-2 bg-transparent border rounded hover:bg-accent/5"
                  onClick={() => {
                    // open the playlist in Spotify web as another affordance
                    const id = spotifyPlaylist.playlistId;
                    if (id)
                      window.open(
                        `https://open.spotify.com/playlist/${encodeURIComponent(id)}`,
                        "_blank",
                      );
                  }}
                  type="button"
                >
                  Open playlist
                </button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              No playlist data found.
            </div>
          )}
        </div>

        {/* YouTube Panel */}
        <div className="p-4 border rounded-lg bg-muted/40">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold">YouTube Playlist</h3>
              <p className="text-sm text-muted-foreground">
                View items — embed or open videos. Direct audio streaming is
                restricted by YouTube.
              </p>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div className="mb-1">Source</div>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                Open in YouTube Music
              </a>
            </div>
          </div>

          {youtubeLoading ? (
            <div className="text-sm text-muted-foreground">
              Loading YouTube playlist…
            </div>
          ) : youtubeError ? (
            <div className="text-sm text-destructive">
              Error: {youtubeError}
            </div>
          ) : youtubePlaylist ? (
            <div>
              <div className="mb-3">
                <div className="text-sm text-muted-foreground mb-1">
                  Playlist ID:{" "}
                  <span className="font-mono text-xs">
                    {youtubePlaylist.playlistId}
                  </span>
                </div>
                <div className="text-sm">
                  Items: {youtubePlaylist.items.length}
                </div>
              </div>

              <div className="space-y-2 max-h-48 overflow-auto mb-3">
                {youtubePlaylist.items.map((item, idx) => {
                  const vid = item.videoId;
                  const watchUrl = vid
                    ? `https://www.youtube.com/watch?v=${vid}`
                    : "#";
                  const thumb = item.thumbnails
                    ? item.thumbnails["default"]?.url ||
                      Object.values(item.thumbnails)[0]?.url
                    : null;
                  return (
                    <div
                      key={item.playlistItemId ?? idx}
                      className="flex items-center justify-between p-2 rounded hover:bg-accent/5"
                    >
                      <div className="flex items-center gap-3">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt=""
                            className="w-12 h-8 rounded object-cover"
                          />
                        ) : (
                          <div className="w-12 h-8 bg-muted rounded" />
                        )}
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.channelTitle || ""}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 text-xs border rounded hover:bg-accent/5"
                          onClick={() => window.open(watchUrl, "_blank")}
                          type="button"
                        >
                          Open
                        </button>

                        <button
                          className="px-2 py-1 text-xs border rounded hover:bg-accent/5"
                          onClick={() => {
                            // offer to add links to audioManager (non-playable typically)
                            if (!vid) return;
                            addYouTubeLinksToAudioManager(youtubePlaylist);
                          }}
                          type="button"
                        >
                          Add links
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button
                  className="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                  onClick={() => {
                    // open the playlist in YouTube Music
                    const id = youtubePlaylist.playlistId;
                    if (id)
                      window.open(
                        `https://music.youtube.com/playlist?list=${encodeURIComponent(id)}`,
                        "_blank",
                      );
                  }}
                  type="button"
                >
                  Open playlist
                </button>

                <button
                  className="px-3 py-2 bg-transparent border rounded hover:bg-accent/5"
                  onClick={() => addYouTubeLinksToAudioManager(youtubePlaylist)}
                  type="button"
                >
                  Add all as links to player
                </button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              No playlist data found.
            </div>
          )}
        </div>
      </div>

      {/* Global message area */}
      <div className="mt-4 text-sm">
        {lastSyncMessage ? (
          <div className="text-green-500">{lastSyncMessage}</div>
        ) : null}
      </div>
    </section>
  );
}
