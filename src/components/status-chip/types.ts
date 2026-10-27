/** Work statuses (LabMate §3.3). Each one is shown by color AND by a glyph. */
export const WORK_STATUSES = ['not-started', 'ongoing', 'paused', 'completed', 'failed', 'halted'] as const
export type WorkStatus = (typeof WORK_STATUSES)[number]

export const WORK_STATUS_LABEL: Record<WorkStatus, string> = {
  'not-started': 'Not started',
  'ongoing': 'Ongoing',
  'paused': 'Paused',
  'completed': 'Completed',
  'failed': 'Failed',
  'halted': 'Halted',
}
