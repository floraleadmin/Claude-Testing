// Dutch text to speech and speech recognition through the Web Speech API.

let voices: SpeechSynthesisVoice[] = [];
const listeners = new Set<() => void>();

function refresh() {
  if (typeof speechSynthesis === 'undefined') return;
  voices = speechSynthesis.getVoices();
  listeners.forEach((fn) => fn());
}

if (typeof speechSynthesis !== 'undefined') {
  refresh();
  speechSynthesis.addEventListener?.('voiceschanged', refresh);
}

export function onVoicesChanged(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function ttsSupported(): boolean {
  return typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined';
}

export function dutchVoices(): SpeechSynthesisVoice[] {
  const nl = voices.filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith('nl'));
  return nl.sort((a, b) => score(b) - score(a));
}

function score(v: SpeechSynthesisVoice): number {
  const lang = v.lang.toLowerCase();
  let s = lang.includes('nl-nl') ? 2 : 1;
  if (/google|natural|neural|premium|enhanced/i.test(v.name)) s += 2;
  if (v.localService) s += 0.5;
  return s;
}

/**
 * 'none' once the browser has listed its voices and none is Dutch (or it
 * cannot speak at all). A German voice reading Dutch would teach a wrong
 * pronunciation, so the app stays silent then and explains how to add a voice.
 */
export function dutchAudio(): 'ok' | 'none' | 'unknown' {
  if (typeof window === 'undefined') return 'unknown';
  if (!ttsSupported()) return 'none';
  if (dutchVoices().length) return 'ok';
  return voices.length ? 'none' : 'unknown';
}

/** Where a learner gets a Dutch voice, per system. */
export const VOICE_HELP = [
  'Chrome und Edge bringen niederländische Stimmen mit – am einfachsten öffnest du Taalfiets dort.',
  'Windows: Einstellungen → Zeit und Sprache → Sprache und Region → Sprache hinzufügen → Nederlands, dabei „Sprachausgabe“ anhaken.',
  'iPhone, iPad, Mac: Bedienungshilfen → Gesprochene Inhalte → Stimmen → Niederländisch.',
  'Android: Einstellungen → Sprachausgabe (Text-in-Sprache) → Google-Sprachausgabe → Sprachdaten für Niederländisch installieren.',
  'Danach die Seite neu laden.',
];

export function pickVoice(uri: string | null): SpeechSynthesisVoice | null {
  const list = dutchVoices();
  return list.find((v) => v.voiceURI === uri) ?? list[0] ?? null;
}

/** Reads Dutch text aloud; false when no Dutch voice exists (nothing is spoken). */
export function speak(text: string, opts: { rate: number; voiceURI: string | null; slow?: boolean }): boolean {
  if (!ttsSupported() || dutchAudio() === 'none') return false;
  speechSynthesis.cancel();
  // "de/het wifi" in a label is read with one article.
  const u = new SpeechSynthesisUtterance(text.replace(/\bde\/het\b/g, 'de'));
  u.lang = 'nl-NL';
  const v = pickVoice(opts.voiceURI);
  if (v) {
    u.voice = v;
    u.lang = v.lang;
  }
  u.rate = opts.slow ? Math.max(0.45, opts.rate * 0.6) : opts.rate;
  speechSynthesis.speak(u);
  return true;
}

export function stopSpeaking(): void {
  if (ttsSupported()) speechSynthesis.cancel();
}

// ------------------------------------------------------------------ recognition

interface RecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

function recognitionCtor(): (new () => RecognitionLike) | null {
  const w = globalThis as unknown as { SpeechRecognition?: new () => RecognitionLike; webkitSpeechRecognition?: new () => RecognitionLike };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function recognitionSupported(): boolean {
  return recognitionCtor() !== null;
}

/** Inside a claude.ai artifact the microphone is blocked by the frame. */
export function inArtifactFrame(): boolean {
  return typeof window !== 'undefined' && window.parent !== window && !!(globalThis as { claude?: unknown }).claude;
}

export interface Listening {
  stop(): void;
}

/** Listens once; resolves with all transcripts heard, or rejects with an error code. */
export function listenOnce(onDone: (alternatives: string[]) => void, onError: (code: string) => void): Listening | null {
  const Ctor = recognitionCtor();
  if (!Ctor) {
    onError('unsupported');
    return null;
  }
  const r = new Ctor();
  r.lang = 'nl-NL';
  r.interimResults = false;
  r.maxAlternatives = 5;
  r.continuous = false;
  let finished = false;
  r.onresult = (e) => {
    finished = true;
    const alts: string[] = [];
    const res = e.results[0];
    for (let i = 0; i < res.length; i++) alts.push(res[i].transcript);
    onDone(alts);
  };
  r.onerror = (e) => {
    finished = true;
    onError(e.error);
  };
  r.onend = () => {
    if (!finished) onError('no-speech');
  };
  try {
    r.start();
  } catch {
    onError('start-failed');
    return null;
  }
  return { stop: () => r.stop() };
}
