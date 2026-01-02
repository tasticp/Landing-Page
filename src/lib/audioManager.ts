/**
 * Landing-Page/src/lib/audioManager.ts
 *
 * Simple singleton AudioManager to manage playback, mute state, and playlists.
 *
 * Usage:
 *   import audioManager from "@/lib/audioManager";
 *   audioManager.addTrack("/audio/track1.mp3", "Track 1");
 *   audioManager.play(); // requires user gesture in many browsers
 *
 * Events:
 *   audioManager.on("play", () => {});
 *   audioManager.on("pause", () => {});
 *   audioManager.on("trackchange", (track) => {});
 *   audioManager.on("mute", (isMuted) => {});
 *   audioManager.on("volumechange", (volume) => {});
 *   audioManager.on("ended", () => {});
 *   audioManager.on("error", (error) => {});
 *
 * Notes:
 * - The audio element is created lazily to avoid autoplay/download before user interaction.
 * - Mute preference is persisted to localStorage under key "audioManager.muted".
 */

export type Track = {
  src: string;
  title?: string;
  filename?: string;
  id?: string;
};

type RepeatMode = "none" | "one" | "all";

type Listener = (...args: unknown[]) => void;

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private playlist: Track[] = [];
  private currentIndex = -1;
  private isPlayingInternal = false;
  private isLoadedInternal = false;
  private volumeInternal = 0.6;
  private mutedInternal = false;
  private repeatMode: RepeatMode = "none";

  // Simple event registry
  private listeners: Map<string, Set<Listener>> = new Map();

  // Local storage key for mute
  private readonly STORAGE_KEY_MUTED = "audioManager.muted";

  constructor() {
    // initialize mute state from localStorage if available
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem(this.STORAGE_KEY_MUTED)
          : null;
      this.mutedInternal = raw === "true";
    } catch {
      this.mutedInternal = false;
    }
  }

  // ---------- Public API ----------

  /**
   * Add a track to the playlist.
   * Returns the track index.
   */
  addTrack(src: string, title?: string): number {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const track: Track = { src, title, id };
    this.playlist.push(track);
    // if no track selected, set to first
    if (this.currentIndex === -1) this.currentIndex = 0;
    this.emit("playlistchange", this.playlist.slice());
    return this.playlist.length - 1;
  }

  addTracks(tracks: Array<{ src: string; title?: string }>) {
    tracks.forEach((t) => this.addTrack(t.src, t.title));
  }

  removeTrack(index: number) {
    if (index < 0 || index >= this.playlist.length) return;
    const removed = this.playlist.splice(index, 1);
    if (this.playlist.length === 0) {
      this.stopAndCleanup();
      this.currentIndex = -1;
    } else {
      if (index === this.currentIndex) {
        // play the next track (same index now points to next item)
        if (this.currentIndex >= this.playlist.length) {
          this.currentIndex = this.playlist.length - 1;
        }
        this.loadCurrentTrack();
      } else if (index < this.currentIndex) {
        this.currentIndex -= 1;
      }
    }
    this.emit("playlistchange", this.playlist.slice());
    return removed[0];
  }

  /**
   * Play (or resume) the current track.
   * Note: Some browsers require this to be called from a user gesture.
   */
  async play(): Promise<void> {
    if (!this.ensureTrackAvailable()) return;
    if (!this.audio) this.createAudioElementForCurrent();

    try {
      await this.audio!.play();
      this.isPlayingInternal = true;
      this.emit("play", this.currentTrack());
    } catch (err) {
      // Play may be blocked by autoplay policies; emit error
      this.isPlayingInternal = false;
      this.emit("error", err);
      throw err;
    }
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlayingInternal = false;
    this.emit("pause");
  }

  async togglePlay() {
    if (this.isPlaying()) {
      this.pause();
    } else {
      await this.play();
    }
  }

  stopAndCleanup() {
    if (this.audio) {
      try {
        this.audio.pause();
        this.audio.src = "";
        this.audio.load();
      } catch {
        // ignore
      }
      this.audio = null;
    }
    this.isPlayingInternal = false;
    this.isLoadedInternal = false;
  }

  playTrack(index: number) {
    if (index < 0 || index >= this.playlist.length) return;
    this.currentIndex = index;
    this.loadCurrentTrack();
    // play will need user gesture in some browsers, but try anyway
    this.play().catch(() => {
      /* swallow - UI will show load/play */
    });
  }

  next() {
    if (this.playlist.length === 0) return;
    if (this.repeatMode === "one") {
      this.playTrack(this.currentIndex);
      return;
    }
    const nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.playlist.length) {
      if (this.repeatMode === "all") {
        this.playTrack(0);
      } else {
        // stop
        this.pause();
        this.emit("ended");
      }
    } else {
      this.playTrack(nextIndex);
    }
  }

  prev() {
    if (this.playlist.length === 0) return;
    const prevIndex = this.currentIndex - 1;
    if (prevIndex < 0) {
      if (this.repeatMode === "all") {
        this.playTrack(this.playlist.length - 1);
      } else {
        this.playTrack(0);
      }
    } else {
      this.playTrack(prevIndex);
    }
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  currentTrack(): Track | null {
    if (this.currentIndex === -1) return null;
    return this.playlist[this.currentIndex] || null;
  }

  getPlaylist(): Track[] {
    return this.playlist.slice();
  }

  setRepeatMode(mode: RepeatMode) {
    this.repeatMode = mode;
    this.emit("repeatchange", mode);
  }

  getRepeatMode(): RepeatMode {
    return this.repeatMode;
  }

  isPlaying(): boolean {
    return this.isPlayingInternal;
  }

  isMuted(): boolean {
    return this.mutedInternal;
  }

  isLoaded(): boolean {
    return this.isLoadedInternal;
  }

  setVolume(v: number) {
    const volume = Math.min(1, Math.max(0, v));
    this.volumeInternal = volume;
    if (this.audio) this.audio.volume = volume;
    this.emit("volumechange", volume);
  }

  getVolume(): number {
    return this.volumeInternal;
  }

  mute() {
    this.mutedInternal = true;
    if (this.audio) this.audio.muted = true;
    this.persistMuted();
    this.emit("mute", true);
  }

  unmute() {
    this.mutedInternal = false;
    if (this.audio) this.audio.muted = false;
    this.persistMuted();
    this.emit("mute", false);
  }

  toggleMute() {
    if (this.mutedInternal) this.unmute();
    else this.mute();
  }

  // ---------- Events ----------
  on(event: string, listener: Listener) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener);
    return () => this.off(event, listener);
  }

  off(event: string, listener: Listener) {
    this.listeners.get(event)?.delete(listener);
  }

  private emit(event: string, ...args: unknown[]) {
    this.listeners.get(event)?.forEach((fn) => {
      try {
        fn(...args);
      } catch {
        // ignore listener errors
      }
    });
  }

  // ---------- Internal helpers ----------

  private persistMuted() {
    try {
      localStorage.setItem(
        this.STORAGE_KEY_MUTED,
        this.mutedInternal ? "true" : "false",
      );
    } catch {
      // ignore
    }
  }

  private ensureTrackAvailable(): boolean {
    if (this.playlist.length === 0) {
      this.emit("error", new Error("No tracks in playlist"));
      return false;
    }
    if (this.currentIndex === -1) this.currentIndex = 0;
    return true;
  }

  private createAudioElementForCurrent() {
    const track = this.currentTrack();
    if (!track) return;

    // If an audio element already exists, remove listeners and replace
    if (this.audio) {
      this.teardownAudioElement();
    }

    const a = new Audio(track.src);
    a.preload = "metadata"; // only metadata to avoid huge downloads
    a.loop = false;
    a.volume = this.volumeInternal;
    a.muted = this.mutedInternal;
    a.crossOrigin = "anonymous";

    // events
    const onPlay = () => {
      this.isPlayingInternal = true;
      this.emit("play", track);
    };
    const onPause = () => {
      this.isPlayingInternal = false;
      this.emit("pause");
    };
    const onCanPlay = () => {
      this.isLoadedInternal = true;
      this.emit("loaded", track);
    };
    const onEnded = () => {
      this.isPlayingInternal = false;
      this.emit("ended", track);
      // Auto-advance depending on repeat mode
      if (this.repeatMode === "one") {
        this.playTrack(this.currentIndex);
      } else {
        this.next();
      }
    };
    const onError = (ev: unknown) => {
      const errCandidate = (ev as { error?: unknown })?.error;
      const err =
        errCandidate instanceof Error
          ? errCandidate
          : new Error(
              typeof errCandidate === "string"
                ? errCandidate
                : "Audio playback error",
            );
      this.emit("error", err);
    };

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("canplay", onCanPlay);
    a.addEventListener("ended", onEnded);
    a.addEventListener("error", onError);

    this.audio = a;
  }

  private teardownAudioElement() {
    if (!this.audio) return;
    try {
      this.audio.pause();
      // remove attached listeners by replacing src and nulling
      this.audio.src = "";
      this.audio.load();
    } catch {
      // ignore
    } finally {
      this.audio = null;
      this.isLoadedInternal = false;
      this.isPlayingInternal = false;
    }
  }

  private loadCurrentTrack() {
    if (!this.ensureTrackAvailable()) return;
    // create or replace audio element for the current index
    this.createAudioElementForCurrent();
    this.emit("trackchange", this.currentTrack());
  }
}

// Export singleton instance
const audioManager = new AudioManager();
export default audioManager;
