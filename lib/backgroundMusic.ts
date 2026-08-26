import { Howl, Howler } from "howler";
import { media } from "@/content";

const TARGET_VOLUME = 0.45;
const FADE_MS = 2500;

let music: Howl | null = null;
let started = false;

type MusicListeners = {
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
};

let listeners: MusicListeners = {};

export function setMusicListeners(next: MusicListeners): void {
  listeners = next;
}

function createMusic(): Howl {
  Howler.autoUnlock = true;
  Howler.html5PoolSize = 1;

  const track = new Howl({
    src: [media.audio.backgroundMusic],
    loop: true,
    volume: TARGET_VOLUME,
    preload: false,
    html5: true,
    onloaderror: (_id, error) => {
      console.warn("Background music failed to load:", error);
    },
    onend: function (this: Howl) {
      if (started && !this.playing()) {
        this.play();
      }
    },
  });

  track.on("play", () => listeners.onPlay?.());
  track.on("pause", () => listeners.onPause?.());
  track.on("stop", () => listeners.onStop?.());

  return track;
}

/** Must be called synchronously inside a click/tap handler */
export function startBackgroundMusic(): boolean {
  if (started && music?.playing()) return true;

  const ctx = Howler.ctx;
  if (ctx && ctx.state === "suspended") {
    void ctx.resume();
  }

  if (!music) {
    music = createMusic();
  }

  const track = music;

  const beginPlay = () => {
    if (started && track.playing()) return true;

    const id = track.play();
    if (id === undefined) return false;

    started = true;
    track.volume(0, id);
    track.fade(0, TARGET_VOLUME, FADE_MS, id);
    return true;
  };

  if (track.state() === "loaded") {
    return beginPlay();
  }

  track.once("load", beginPlay);
  track.load();
  return beginPlay();
}

export function isBackgroundMusicPlaying(): boolean {
  return started && (music?.playing() ?? false);
}

export function toggleBackgroundMusicMute(): boolean {
  if (!music) return false;
  const next = !music.mute();
  music.mute(next);
  return next;
}

export function hasBackgroundMusicStarted(): boolean {
  return started;
}
