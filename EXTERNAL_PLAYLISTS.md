# External Playlists (Spotify & YouTube)

This document explains how to integrate external playlists (Spotify, YouTube) with the project's audio system.
It covers the server-side scaffolds already added, how to wire results into the `audioManager` and `AudioPlayer`, safety and policy notes, and example client usage.

Table of contents
- Overview
- What is included in the repo (server endpoints)
- Spotify integration (server-side + client usage)
- YouTube integration (server-side + client usage & limitations)
- How to wire external tracks into `audioManager` (examples)
- Deployment & environment variables
- Security, rate limits, and best practices
- Next steps / optional features

---

## Overview

We implemented:
- A build-time script `scripts/generate-audio-playlist.js` that generates `public/audio/playlist.json` from audio files in `public/audio/`.
- A singleton `audioManager` (`src/lib/audioManager.ts`) that manages a playlist, play/pause/next/prev, volume and mute.
- Client UI `src/components/AudioPlayer.tsx` which uses `audioManager`.
- Server scaffolds:
  - Spotify: `src/app/api/spotify/route.ts` — fetches Spotify playlist tracks via Client Credentials flow.
  - YouTube: `src/app/api/youtube/route.ts` — fetches YouTube playlist items via Data API v3.

See the server scaffold files for implementation details:
```Landing-Page/src/app/api/spotify/route.ts#L1-213
(code shown in-project)
```

```Landing-Page/src/app/api/youtube/route.ts#L1-236
(code shown in-project)
```

---

## Spotify integration

Notes:
- The server route at `/api/spotify` (scaffolded in this repo) uses Spotify Client Credentials flow to get an app access token and hits the Spotify Playlists endpoint, then returns a simplified payload for client consumption.
- Client Credentials does NOT provide user-specific or private playlist access. Only public playlists / public data are available.

Server route:
```Landing-Page/src/app/api/spotify/route.ts#L1-213
(code shown in-project)
```

Environment variables (set in Netlify, Vercel, or host):
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- (optional) `SPOTIFY_DEFAULT_PLAYLIST_ID` — used by the server if `?playlistId=` isn't supplied.

Recommended server call from the client:
- GET `/api/spotify?playlistId=<PLAYLIST_ID>&limit=50&offset=0`

Typical payload returned by the server includes `items` with basic fields:
- `id`, `name`, `preview_url`, `duration_ms`, `artists`, `album`, etc.

Important:
- `preview_url` (30s clip) is often available for many tracks. This is the direct audio URL you can add to `audioManager` for playback.
- Many tracks do NOT have `preview_url`; in that case you cannot stream the full track from Spotify directly. Consider using preview clips or linking to Spotify.

Client-side mapping example:
```Landing-Page/src/components/AudioPlayer.tsx#L1-200
// Example: fetch Spotify playlist and add preview tracks into audioManager
(async function addSpotifyPlaylistToAudioManager(playlistId) {
  const res = await fetch(`/api/spotify?playlistId=${encodeURIComponent(playlistId)}&limit=50`);
  if (!res.ok) {
    console.error("Failed to fetch playlist", await res.text());
    return;
  }
  const payload = await res.json();
  // payload.items: array of simplified track objects
  payload.items.forEach((t) => {
    // t.preview_url may be null; only add if present
    if (t.preview_url) {
      // audioManager.addTrack expects a public URL (e.g. t.preview_url) and a title
      audioManager.addTrack(t.preview_url, `${t.name} — ${t.artists?.map(a => a.name).join(", ")}`);
    } else {
      // Optionally add a link-only entry (not streamable by audioManager)
      // For example: audioManager.addTrack(`/external/spotify-link?trackId=${t.id}`, t.name)
    }
  });
})();
```

Best practices:
- Only add tracks with `preview_url` to `audioManager` for direct playback.
- If you need to play full tracks, you must use Spotify SDKs with authorization and obey their playback policies (often requires Spotify Connect / Web Playback SDK and a logged-in user).
- Cache token responses on the server to avoid requesting tokens on every call (the scaffold implements token caching in-memory for short-lived tokens).

---

## YouTube integration

Notes:
- The server route `/api/youtube` fetches playlist items via YouTube Data API v3.
- YouTube does not provide direct raw audio stream URLs for video content via the Data API — direct streaming of audio via YouTube is restricted by their ToS.
- For YouTube content, the recommended approaches:
  - Use the YouTube IFrame Player API for playback in the browser (embed a player).
  - Use the video `watch` URL as an external link (open in new tab).
  - If you control server-side transcoding (and have the rights), you could produce short preview audio files and host them under `public/audio/` — but be careful with copyright.

Server route:
```Landing-Page/src/app/api/youtube/route.ts#L1-236
(code shown in-project)
```

Typical server usage:
- GET `/api/youtube?playlistId=<YOUTUBE_PLAYLIST_ID>&maxResults=20&includeDetails=1`

Mapping YouTube items into your UI:
- The `AudioPlayer` / `audioManager` works with direct audio URLs. YouTube videos are not direct audio streams and typically cannot be added as playable tracks.
- For YouTube-based playlist support in the site, you can:
  - Use the server to return playlist metadata and show a UI that opens the selected video in an embedded player (IFrame) or new tab.
  - Or host your own preview clips (if licensed) and add them to `public/audio/`, letting the build script and playlist generator pick them up.

Example: using returned playlist to open/embed YouTube videos:
```Landing-Page/src/app/api/youtube/route.ts#L1-236
// client usage (conceptual): fetch playlist, then open selected item in an IFrame or new tab
```

---

## Wiring external playlists into `audioManager` (practical examples)

1. Populate audioManager from server-provided playlist.json (build-time):
   - The generator `scripts/generate-audio-playlist.js` writes `public/audio/playlist.json`.
   - `AudioPlayer` will attempt to fetch `/audio/playlist.json` at runtime and add entries to `audioManager`.
   - This is SSG-friendly — the playlist JSON is part of the built static files.

2. Populate audioManager from Spotify preview URLs (runtime):
   - Fetch `/api/spotify?playlistId=...`
   - For each returned item, if `preview_url` exists, call:
   ```Landing-Page/src/lib/audioManager.ts#L1-200
   // audioManager.addTrack(src, title)
   audioManager.addTrack(previewUrl, title);
   ```
   - After populating, show the `AudioPlayer` UI (it subscribes to audioManager events).

3. Example client helper function to add Spotify playlist:
```Landing-Page/src/components/AudioPlayer.tsx#L1-200
export async function integrateSpotifyPlaylistIntoAudioManager(playlistId) {
  const res = await fetch(`/api/spotify?playlistId=${encodeURIComponent(playlistId)}`);
  if (!res.ok) throw new Error("Failed to fetch");
  const payload = await res.json();
  const items = payload.items || [];
  for (const it of items) {
    if (it.preview_url) {
      // title example: "Song Name — Artist"
      const title = `${it.name} — ${(it.artists || []).map(a => a.name).join(", ")}`;
      audioManager.addTrack(it.preview_url, title);
    }
  }
}
```

4. YouTube: embed instead of streaming
- Use `/api/youtube` to get playlist metadata and then embed the selected video using the YouTube IFrame Player API:
```Landing-Page/src/app/api/youtube/route.ts#L1-236
// Example (client): after fetching items, embed selected video id in <iframe src="https://www.youtube.com/embed/VIDEO_ID" />
```

---

## Deployment & environment variables

Set these env vars in your host (Netlify, Vercel, etc.):

- Spotify:
  - `SPOTIFY_CLIENT_ID`
  - `SPOTIFY_CLIENT_SECRET`
  - Optionally `SPOTIFY_DEFAULT_PLAYLIST_ID`

- YouTube:
  - `YOUTUBE_API_KEY`

Notes for Netlify:
- We added `"prebuild": "node ./scripts/generate-audio-playlist.js"` to `package.json`. Netlify runs `npm run build`, which executes `prebuild` first. This writes `public/audio/playlist.json` into the published directory if audio files exist.
- Keep secrets in Netlify environment settings — do not commit them to repository.

---

## Security, rate limits, and best practices

- Do not embed your Spotify secret in client-side code. Use the server route (already scaffolded).
- Spotify token should be cached server-side. The scaffold caches tokens in memory.
- YouTube Data API has quota limits — caching responses (scaffold included short in-memory cache) helps reduce quota use.
- Respect content licensing:
  - Preview clips are fine to play (Spotify provides them).
  - Full tracks must be played according to provider policies (e.g., Spotify SDKs and user login).
  - Do not attempt to circumvent YouTube streaming rules by scraping or direct audio extraction.
- For production, consider using a proper cache layer (Redis) if you expect heavy traffic.

---

## Next steps & optional features

- Auto-scan `public/audio/` at build-time is implemented. You can add more features:
  - Build-time metadata extraction (duration) using `ffprobe` (requires native dependency).
  - Automatic playlist import UI (allow site owner to paste a Spotify playlist ID and populate tracks).
  - Integration with Spotify Web Playback SDK for full-track playback (requires logged-in user and deeper integration).
  - Support for external playlist sources (like SoundCloud) — similar server-side scaffolds can be added.

---

If you want, I can:
- Add a small admin UI to import Spotify/YouTube playlists (server-side calls + store selections).
- Add a build-time job to generate per-playlist preview audio files (if you have rights) and include them in `public/audio/`.
- Scaffold Spotify Web Playback SDK integration (requires user auth flow and front-end token exchange).

If you need help wiring a specific playlist now (e.g., give me a Spotify playlist ID), tell me which playlist ID to integrate and I'll add example code or patch to automatically add it to the site on next build/deploy.

Note: example playlist IDs have been added to the UI component for convenience. The ExternalPlaylists component is pre-configured to fetch and display the following playlists (you can change these in the component props or via the UI):

- Spotify playlist (ID): 7oE9ab5ecrDjpsceNlbTZ9
  - URL: https://open.spotify.com/playlist/7oE9ab5ecrDjpsceNlbTZ9?si=46f83d5a6c2843d5

- YouTube Music playlist (list id): PLtfzLAsv-NzoeTfHBFCc70lnWS206tgox
  - URL: https://music.youtube.com/playlist?list=PLtfzLAsv-NzoeTfHBFCc70lnWS206tgox&si=6W2HS7hGPVmDecAV

What I did with these IDs:
- The ExternalPlaylists UI will automatically attempt to fetch metadata for these playlists on mount (via the server endpoints /api/spotify and /api/youtube).
- For Spotify: preview clips with `preview_url` will be offered to sync into the site's audio player (audioManager). Click "Sync preview clips to player" in the Spotify panel to add playable items.
- For YouTube: items are listed and you can open or "Add links" (these add watch URLs to the audioManager as link entries — note these are not direct audio streams and are intended for publicizing/quick access rather than playback).

If you'd like, I can:
- Add an "Import" button to permanently save selected external playlists into a site-managed JSON store.
- Add UI to let you paste other playlist URLs/IDs and import them on demand.
- Add playback integration for Spotify Web Playback SDK (requires user auth) if you want full-track playback in the browser.

Which of these would you like me to implement next?