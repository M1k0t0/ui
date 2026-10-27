<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '#/lib/utils'

// Schedule bar (§13.2): one piece of work drawn across the days it spans. The
// fill + edge carry the status; a planned bar is a dashed Steel outline and a
// handed-off bar is a Well plate whose title ends `→ mate`. Work picked up
// from another mate shows the handoff mark at its start (§13.21); work that
// runs past the week shows ‹ / › at that edge (§13.22). Selecting a bar lights
// it (§13.5 → §10.53). Positioning on the week grid is the caller's job.
export type ScheduleBarStatus = 'ongoing' | 'completed' | 'paused' | 'failed' | 'planned' | 'handed-off' | 'halted'

const props = defineProps<{
  status: ScheduleBarStatus
  title: string
  /** Task ID, LAB-nnn. */
  code?: string
  /** Handed-off bars: the mate the work went to. */
  handedTo?: string
  /** Work picked up from another mate (shows the handoff mark). */
  fromHandoff?: boolean
  continuesBefore?: boolean
  continuesAfter?: boolean
  selected?: boolean
  class?: HTMLAttributes['class']
}>()

const plate: Record<ScheduleBarStatus, string> = {
  'ongoing': 'bg-pulse text-[color:var(--ink)] border-solid border-[color:var(--ink)]',
  'completed': 'bg-[var(--status-completed-base)] text-[color:var(--ink)] border-solid border-[color:var(--ink)]',
  'paused': 'bg-[var(--status-paused-base)] text-[color:var(--ink)] border-solid border-[color:var(--ink)]',
  'failed': 'bg-spark text-[color:var(--ink)] border-solid border-[color:var(--ink)]',
  'planned': 'bg-[var(--paper)] text-[color:var(--ink)] border-dashed border-[color:var(--steel)]',
  'handed-off': 'bg-[var(--well)] text-[color:var(--ink)] border-solid border-[color:var(--ink)]',
  'halted': 'bg-[var(--ink)] text-[color:var(--paper)] border-solid border-[color:var(--ink)]',
}
const NAME: Record<ScheduleBarStatus, string> = {
  'ongoing': 'Ongoing',
  'completed': 'Completed',
  'paused': 'Paused',
  'failed': 'Failed',
  'planned': 'Planned',
  'handed-off': 'Handed off',
  'halted': 'Halted',
}
const text = computed(() => props.status === 'handed-off' && props.handedTo ? `${props.title} → ${props.handedTo}` : props.title)
const aria = computed(() => [props.code, text.value, NAME[props.status]].filter(Boolean).join(', '))
</script>

<template>
  <span
    data-slot="schedule-bar"
    :data-status="status"
    :data-selected="selected ? '' : undefined"
    :aria-label="aria"
    :class="cn(
      'flex h-9 min-w-0 items-center gap-1.5 overflow-hidden px-2 text-left',
      selected ? 'border-2 border-solid border-[color:var(--ink)] shadow-[0_0_0_3px_var(--trace-light)]' : 'border-(length:--stroke)',
      plate[status],
      props.class,
    )"
  >
    <span v-if="continuesBefore" class="text-caption" aria-hidden="true">‹</span>
    <svg v-if="fromHandoff" viewBox="0 0 40 16" class="h-3 w-7 shrink-0" aria-hidden="true">
      <polygon points="8,1 14,4.5 14,11.5 8,15 2,11.5 2,4.5" fill="var(--ink)" />
      <path d="M17 8h12 M25 4l4 4-4 4" fill="none" stroke="var(--ink)" stroke-width="1.5" />
      <polygon points="33,1 37,1 39,4 39,12 37,15 33,15 31,12 31,4" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.3" />
    </svg>
    <span v-if="code" class="shrink-0 font-mono text-[0.625rem]">{{ code }}</span>
    <span class="min-w-0 flex-1 truncate text-[0.8125rem] font-semibold">{{ text }}</span>
    <span v-if="continuesAfter" class="text-caption" aria-hidden="true">›</span>
  </span>
</template>
