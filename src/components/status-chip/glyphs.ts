import type { WorkStatus } from './types'

/** Status glyph paths on a 24 grid (LabMate §3.3), shared by chips and nodes. */
export const STATUS_GLYPH: Record<WorkStatus, { d: string, fill: boolean }> = {
  'not-started': { d: '', fill: false },
  'ongoing': { d: 'M8 5l11 7-11 7z', fill: true },
  'paused': { d: 'M7 5h3.5v14H7z M13.5 5H17v14h-3.5z', fill: true },
  'completed': { d: 'M5 12.5l4.5 4.5L19 7', fill: false },
  'failed': { d: 'M6 6l12 12 M18 6L6 18', fill: false },
  'halted': { d: 'M6 6h12v12H6z', fill: true },
}

/** The three planes + glyph ink of a status, as token references (§2.42). */
export function statusPlanes(status: WorkStatus | 'locked') {
  return {
    l: `var(--status-${status}-light)`,
    b: `var(--status-${status}-base)`,
    d: `var(--status-${status}-deep)`,
    g: `var(--status-${status}-glyph)`,
  }
}
