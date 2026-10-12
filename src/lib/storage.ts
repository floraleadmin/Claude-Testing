// Saves progress in localStorage and, inside a claude.ai artifact, in the
// viewer's private db document so it follows them across devices.
import { compact, isProgress, migrate, type Progress } from './progress';

const KEY = 'taalfiets:v1';

export function loadLocal(): Progress | null {
  try {
    const raw = localStorage.getItem(KEY);
    const data: unknown = raw ? JSON.parse(raw) : null;
    return isProgress(data) ? migrate(data) : null;
  } catch {
    return null;
  }
}

export function saveLocal(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // Storage can be full or blocked (private mode); the cloud copy still works.
  }
}

/** Calls `fn` when another tab of the app saves progress. */
export function onOtherTab(fn: (p: Progress) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const h = (e: StorageEvent) => {
    if (e.key !== KEY || !e.newValue) return;
    try {
      const data: unknown = JSON.parse(e.newValue);
      if (isProgress(data)) fn(migrate(data));
    } catch {
      // A broken copy from another tab is ignored; this tab keeps its own.
    }
  };
  window.addEventListener('storage', h);
  return () => window.removeEventListener('storage', h);
}

interface DocRef {
  get(): Promise<{ exists: boolean; data(): Record<string, unknown> | undefined }>;
  set(data: Record<string, unknown>): Promise<void>;
}

interface ClaudeLike {
  use(name: string): Promise<unknown>;
}

let remote: DocRef | null = null;
let pending: Progress | null = null;
let writing = false;
let timer: ReturnType<typeof setTimeout> | null = null;

export type SyncState = 'local' | 'cloud' | 'error';
let syncListener: (s: SyncState) => void = () => {};
export function onSyncState(fn: (s: SyncState) => void) {
  syncListener = fn;
}

/**
 * Connects to the artifact's per-viewer storage when available. Calls
 * `adopt` with the cloud copy when it is newer than the local one.
 */
export async function initCloud(getLocal: () => Progress, adopt: (p: Progress) => void): Promise<void> {
  const claude = (globalThis as unknown as { claude?: ClaudeLike }).claude;
  if (!claude || typeof claude.use !== 'function') return;
  try {
    const user = (await claude.use('user')) as { id(): Promise<string | null> } | null;
    const db = (await claude.use('db')) as { doc(path: string): DocRef } | null;
    if (!user || !db) return;
    const id = await user.id();
    if (!id) return;
    remote = db.doc(`data/users/${id}/progress`);
    const snap = await remote.get();
    const local = getLocal();
    if (snap.exists && isProgress(snap.data())) {
      const cloud = migrate(snap.data());
      if (cloud.updatedAt > local.updatedAt) adopt(cloud);
      else if (local.updatedAt > cloud.updatedAt) scheduleCloud(local);
    } else if (local.stats.exercises > 0 || local.onboarded) {
      scheduleCloud(local);
    }
    syncListener('cloud');
  } catch {
    remote = null;
    syncListener('error');
  }
}

export function scheduleCloud(p: Progress): void {
  if (!remote) return;
  pending = p;
  if (timer) clearTimeout(timer);
  timer = setTimeout(flush, 1500);
}

async function flush(): Promise<void> {
  if (!remote || !pending || writing) return;
  writing = true;
  const p = compact(pending);
  pending = null;
  try {
    await remote.set(JSON.parse(JSON.stringify(p)) as Record<string, unknown>);
    syncListener('cloud');
  } catch {
    syncListener('error');
  } finally {
    writing = false;
    if (pending) timer = setTimeout(flush, 1500);
  }
}

export function isCloud(): boolean {
  return remote !== null;
}
