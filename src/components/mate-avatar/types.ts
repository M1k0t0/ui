/** A mate is a human or an agent (LabMate §1.1). Shape tells who (§5). */
export type MateKind = 'human' | 'agent'
export type MateAvatarSize = 'sm' | 'md' | 'lg' | 'xl'
/** Agent badge states (§5.6). */
export type MateBadge = 'running' | 'waiting' | 'blocked' | 'idle'
/** Mate status chips (§5.5). Agents and humans have separate vocabularies. */
export type AgentStatus = 'running' | 'planning' | 'waiting' | 'blocked' | 'idle'
export type HumanStatus = 'available' | 'in-focus' | 'away' | 'invited'
export type MateStatus = AgentStatus | HumanStatus

export function mateInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
}
