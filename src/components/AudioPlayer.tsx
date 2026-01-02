"use client";

import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  Music,
  SkipForward,
  SkipBack,
  Volume2,
} from "lucide-react";
import audioManager, { Track } from "@/lib/audioManager";

type AudioPlayerProps = {
  /**
   * Optional initial fallback track to add when the playlist is empty.
   * Default: "/audio/music.mp3"
   */
  fallback?: string;
  ariaLabel?: string;
};

/**
 * AudioPlayer (playlist + controls)
 * - Uses the singleton audioManager for playback and playlist management
 * - Exposes track selection UI and play/pause/prev/next/volume controls
 *
 * Note: Place audio files under public/audio/ and they will be reachable as "/audio/<file>"
 */
export default function AudioPlayer({
  fallback = "/audio/music.mp3",
  ariaLabel = "Toggle background music",
}: AudioPlayerProps) {
  const [playlist, setPlaylist] = useState<Track[]>(audioManager.getPlaylist());
  const [currentIndex, setCurrentIndex] = useState(
    audioManager.getCurrentIndex(),
  );
  const [isPlaying, setIsPlaying] = useState(audioManager.isPlaying());
  const [volume, setVolume] = useState<number>(audioManager.getVolume());
  const [muted, setMuted] = useState<boolean>(audioManager.isMuted());
  const [loaded, setLoaded] = useState<boolean>(audioManager.isLoaded());

  useEffect(() => {
    let mounted = true;

    // Attempt to fetch a generated playlist.json at build-time (public/audio/playlist.json).
    // If present, populate the audioManager playlist with these tracks.
    async function initPlaylistFromFile() {
      try {
        const res = await fetch("/audio/playlist.json", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            // Add tracks that are not yet present in audioManager
            const existingSrcs = new Set(
              audioManager.getPlaylist().map((t) => t.src),
            );
            const arr = data as unknown as Track[];
            for (const t of arr) {
              const src =
                (t?.src ?? (t as any)?.filename)
                  ? `/audio/${(t as any).filename}`
                  : undefined;
              const title = t?.title ?? (t as any)?.filename ?? undefined;
              if (src && !existingSrcs.has(src)) {
                audioManager.addTrack(src, title);
              }
            }
            if (mounted) {
              setPlaylist(audioManager.getPlaylist());
              setCurrentIndex(audioManager.getCurrentIndex());
            }
            return;
          }
        }
      } catch {
        // ignore fetch errors — we'll fall back below
      }

      // If no playlist file or fetch failed, ensure at least the fallback exists
      if (audioManager.getPlaylist().length === 0 && fallback) {
        audioManager.addTrack(fallback, "Default track");
        if (mounted) {
          setPlaylist(audioManager.getPlaylist());
          setCurrentIndex(audioManager.getCurrentIndex());
        }
      }
    }

    initPlaylistFromFile();

    // Subscribe to audioManager events to keep UI in sync
    const unsubPlay = audioManager.on("play", () => {
      setIsPlaying(true);
      setPlaylist(audioManager.getPlaylist());
      setCurrentIndex(audioManager.getCurrentIndex());
    });
    const unsubPause = audioManager.on("pause", () => setIsPlaying(false));
    const unsubLoaded = audioManager.on("loaded", () => setLoaded(true));
    const unsubTrackChange = audioManager.on("trackchange", () => {
      setPlaylist(audioManager.getPlaylist());
      setCurrentIndex(audioManager.getCurrentIndex());
      setLoaded(audioManager.isLoaded());
    });

    // Cast event payloads safely from unknown to expected types
    const unsubMute = audioManager.on("mute", (m: unknown) => {
      setMuted(Boolean(m));
    });
    const unsubVolume = audioManager.on("volumechange", (v: unknown) => {
      if (typeof v === "number") {
        setVolume(v);
      }
    });
    const unsubPlaylist = audioManager.on("playlistchange", (pl: unknown) =>
      setPlaylist(pl as Track[]),
    );

    return () => {
      mounted = false;
      unsubPlay();
      unsubPause();
      unsubLoaded();
      unsubTrackChange();
      unsubMute();
      unsubVolume();
      unsubPlaylist();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Controls
  const togglePlay = async () => {
    try {
      await audioManager.togglePlay();
      setIsPlaying(audioManager.isPlaying());
    } catch {
      // swallow - UI already reflects state via events
      setIsPlaying(audioManager.isPlaying());
    }
  };

  const next = () => {
    audioManager.next();
  };

  const prev = () => {
    audioManager.prev();
  };

  const selectTrack = (index: number) => {
    audioManager.playTrack(index);
    setCurrentIndex(index);
  };

  const changeVolume = (v: number) => {
    audioManager.setVolume(v);
    setVolume(v);
  };

  const toggleMute = () => {
    audioManager.toggleMute();
    setMuted(audioManager.isMuted());
  };

  // Helper to display a title for a track
  const trackLabel = (t: Track, idx: number) =>
    t?.title
      ? `${idx + 1}. ${t.title}`
      : `${idx + 1}. ${t?.src?.split("/").pop() || "Track"}`;

  return (
    <div className="flex items-center gap-3">
      {/* Small music icon */}
      <div
        className="p-2 rounded-md bg-accent/10 hover:bg-accent/20 transition-colors flex items-center justify-center"
        title="Music"
        aria-hidden="true"
      >
        <Music className="w-5 h-5 text-foreground" />
      </div>

      {/* Track selector */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous track"
          className="p-2 rounded-md hover:bg-accent/10 transition-colors"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={ariaLabel}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-background/80 border border-border/20 hover:bg-accent/10 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span className="text-sm">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span className="text-sm">{loaded ? "Play" : "Load & Play"}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next track"
          className="p-2 rounded-md hover:bg-accent/10 transition-colors"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Volume + mute */}
      <div className="flex items-center gap-2 ml-2">
        <button
          type="button"
          onClick={toggleMute}
          aria-pressed={muted}
          aria-label="Mute music"
          className="p-2 rounded-md hover:bg-accent/10 transition-colors"
        >
          <Volume2 className="w-4 h-4" />
        </button>

        <input
          aria-label="Music volume"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => changeVolume(Number(e.target.value))}
          className="w-24 h-2 bg-muted rounded"
        />
      </div>

      {/* Playlist dropdown / list */}
      <div className="ml-4">
        {playlist.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No tracks — drop files into public/audio/ as music.mp3 (or add via
            AudioManager)
          </div>
        ) : (
          <select
            aria-label="Select track"
            value={currentIndex}
            onChange={(e) => selectTrack(Number(e.target.value))}
            className="bg-background border border-border/20 rounded px-2 py-1"
          >
            {playlist.map((t: Track, i: number) => (
              <option key={t.id ?? t.src ?? i} value={i}>
                {trackLabel(t, i)}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
