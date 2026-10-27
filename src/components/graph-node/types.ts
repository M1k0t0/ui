import type { WorkStatus } from '../status-chip/types'

/** Node kinds of the progress graph (LabMate §8). */
export type GraphNodeKind = 'start' | 'task' | 'goal' | 'milestone' | 'project-goal'
/** §9 — the statuses a milestone may take (adds the locked / ready pre-states). */
export type MilestoneStatus = 'locked' | 'ready' | 'not-started' | 'ongoing' | 'completed' | 'halted'
/** §9 — the statuses the project goal may take. */
export type ProjectGoalStatus = 'not-started' | 'ongoing' | 'completed' | 'halted'
/** §10.4 — task priority; it only lights an ONGOING task. */
export type TaskPriority = 'p1' | 'p2' | 'p3'
export type { WorkStatus }

export const STATUS_NAME: Record<WorkStatus | 'locked' | 'ready', string> = {
  'not-started': 'Not started',
  'ongoing': 'Ongoing',
  'paused': 'Paused',
  'completed': 'Completed',
  'failed': 'Failed',
  'halted': 'Halted',
  'locked': 'Locked',
  'ready': 'Ready to unlock',
}
