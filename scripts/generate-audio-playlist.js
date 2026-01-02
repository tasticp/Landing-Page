#!/usr/bin/env node
// Ensure this script is executable in environments where file permissions may be lost.
// Attempt to set the executable bit on this script file at runtime. This is safe to run
// multiple times and will be a no-op if permissions are already set or if the environment
// does not permit changing file modes (errors are intentionally ignored).
try {
  const fs = require("fs");
  // Use a permissive executable mode for owner/group/others where supported
  fs.chmodSync(__filename, 0o755);
} catch (e) {
  // Not fatal — some CI environments or OSes may disallow chmod; continue anyway.
}

/**
 * scripts/generate-audio-playlist.js
 *
 * Build-time utility:
 * - Scans the project's `public/audio` directory for audio files
 * - Produces `public/audio/playlist.json` (array of track objects)
 *
 * Usage:
 *   node scripts/generate-audio-playlist.js
 *
 * Options:
 *   --dir <path>    (optional) directory to scan (defaults to ../public/audio)
 *   --out <path>    (optional) output JSON file (defaults to ../public/audio/playlist.json)
 *
 * Notes:
 * - This script is intentionally dependency-free (no external npm packages).
 * - It does not inspect audio duration (would require additional native deps).
 * - Each track object includes: id, src (public-relative), filename, title, size, mtime
 *
 * Intended to be run during CI/SSG build (Netlify, Vercel, etc.). If you add it to
 * your build pipeline, ensure it runs before the app bundle step so the generated
 * playlist JSON is available at runtime.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

async function main() {
  try {
    const argv = process.argv.slice(2);
    const getArgValue = (flag) => {
      const idx = argv.indexOf(flag);
      if (idx === -1) return undefined;
      return argv[idx + 1];
    };

    const scriptDir = __dirname;
    const defaultAudioDir = path.join(scriptDir, "..", "public", "audio");
    const defaultOut = path.join(defaultAudioDir, "playlist.json");

    const audioDir = path.resolve(
      getArgValue("--dir") || getArgValue("-d") || defaultAudioDir,
    );
    const outFile = path.resolve(
      getArgValue("--out") || getArgValue("-o") || defaultOut,
    );

    const allowedExts = new Set([
      ".mp3",
      ".ogg",
      ".wav",
      ".m4a",
      ".flac",
      ".aac",
      ".webm",
    ]);

    // Ensure audioDir exists
    if (!fs.existsSync(audioDir) || !fs.statSync(audioDir).isDirectory()) {
      console.error(
        `[generate-audio-playlist] audio directory not found: ${audioDir}`,
      );
      console.error("[generate-audio-playlist] No playlist written.");
      process.exit(0); // Not fatal: project may legitimately have no audio files
    }

    const files = await fs.promises.readdir(audioDir);
    const tracks = [];

    for (const fname of files) {
      // skip dotfiles and directories
      if (fname.startsWith(".")) continue;
      const full = path.join(audioDir, fname);
      let stat;
      try {
        stat = await fs.promises.stat(full);
      } catch {
        continue;
      }
      if (!stat.isFile()) continue;

      const ext = path.extname(fname).toLowerCase();
      if (!allowedExts.has(ext)) continue;

      // build a track object
      const id =
        crypto && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

      const filename = fname;
      // public-relative src (so client can fetch /audio/filename)
      const src = path.posix.join("/audio", filename);

      // human-friendly title from filename
      const nameWithoutExt = filename.replace(ext, "");
      const title =
        nameWithoutExt
          .replace(/[_\-]+/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .replace(/\b\w/g, (ch) => ch.toUpperCase()) || filename;

      tracks.push({
        id,
        src,
        filename,
        title,
        size: stat.size,
        mtime: stat.mtime.toISOString(),
      });
    }

    // Sort tracks alphabetically by filename (stable)
    tracks.sort((a, b) =>
      a.filename.localeCompare(b.filename, undefined, { sensitivity: "base" }),
    );

    // Ensure output directory exists
    const outDir = path.dirname(outFile);
    await fs.promises.mkdir(outDir, { recursive: true });

    // Write JSON with 2-space formatting
    const json = JSON.stringify(tracks, null, 2) + "\n";
    await fs.promises.writeFile(outFile, json, "utf8");

    console.log(`[generate-audio-playlist] Found ${tracks.length} track(s).`);
    console.log(`[generate-audio-playlist] Wrote playlist -> ${outFile}`);
    process.exit(0);
  } catch (err) {
    console.error(
      "[generate-audio-playlist] Error:",
      err && err.stack ? err.stack : err,
    );
    process.exit(2);
  }
}

if (require.main === module) {
  main();
}
