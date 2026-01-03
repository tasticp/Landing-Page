"use client";

import { useEffect, useState } from "react";
import audioManager, { Track } from "@/lib/audioManager";

interface PlaylistTrack {
  title: string;
  url: string;
  type: "audio" | "link"; // 'audio' for playable streams, 'link' for external links
}

interface PlaylistConfig {
  name: string;
  description?: string;
  tracks: PlaylistTrack[];
}

/**
 * GitHubPlaylistLoader
 *
 * Fetches a playlist configuration from a GitHub repository and loads tracks
 * into the audioManager.
 *
 * The GitHub repository should contain a `playlist.json` file with the following structure:
 * {
 *   "name": "My Playlist",
 *   "description": "Optional description",
 *   "tracks": [
 *     {
 *       "title": "Track Name",
 *       "url": "https://...",
 *       "type": "audio"
 *     }
 *   ]
 * }
 *
 * Usage:
 * <GitHubPlaylistLoader
 *   owner="tasticp"
 *   repo="my-playlists"
 *   path="playlist.json"
 * />
 */

export default function GitHubPlaylistLoader({
  owner = "tasticp",
  repo = "my-playlists",
  path = "playlist.json",
  autoLoad = true,
}: {
  owner?: string;
  repo?: string;
  path?: string;
  autoLoad?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<PlaylistConfig | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);

  const fetchPlaylistFromGitHub = async () => {
    setLoading(true);
    setError(null);

    try {
      // Construct the raw GitHub content URL
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch playlist from GitHub: ${response.statusText}`
        );
      }

      const data: PlaylistConfig = await response.json();

      // Validate the structure
      if (!data.name || !Array.isArray(data.tracks)) {
        throw new Error(
          "Invalid playlist format: missing 'name' or 'tracks' array"
        );
      }

      setPlaylist(data);

      // Auto-load tracks into audioManager if requested
      if (autoLoad) {
        loadTracksIntoAudioManager(data.tracks);
      }

      setLastSync(new Date().toLocaleString());
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      console.error("GitHubPlaylistLoader error:", message);
    } finally {
      setLoading(false);
    }
  };

  const loadTracksIntoAudioManager = (tracks: PlaylistTrack[]) => {
    tracks.forEach((track) => {
      if (track.type === "audio" || track.type === "link") {
        audioManager.addTrack(track.url, track.title);
      }
    });
  };

  // Auto-fetch on mount
  useEffect(() => {
    if (autoLoad) {
      fetchPlaylistFromGitHub();
    }
  }, [owner, repo, path, autoLoad]);

  // Don't render anything visible — this component just loads data
  // If you want to display status, you can uncomment the section below
  /*
  return (
    <div className="relative z-10">
      {error && (
        <div className="px-6 py-4 bg-red-900/20 text-red-300 rounded-md">
          <p>Error loading playlist: {error}</p>
          <button
            onClick={fetchPlaylistFromGitHub}
            className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
          >
            Retry
          </button>
        </div>
      )}
      {loading && <p className="text-muted-foreground">Loading playlist...</p>}
      {playlist && lastSync && (
        <p className="text-xs text-muted-foreground">
          Loaded: {playlist.name} (Last sync: {lastSync})
        </p>
      )}
    </div>
  );
  */

  return null;
}
