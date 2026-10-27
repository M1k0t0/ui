<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '#/lib/utils'

// Activity chip (design doc "08 · Status & progress"): what a mate's work is
// doing right now — running / planning / waiting on you / blocked / idle /
// done. Each state has its own plate AND its own mark, so it reads without
// colour (§14.2): BLOCKED is a hatched strip in an Ink frame, DONE a
// hexagon-check in a Fog frame. Square by default; `chamfer` opts into the
// 4px top-left / bottom-right cut.
export type ActivityStatus = 'running' | 'planning' | 'waiting' | 'blocked' | 'idle' | 'done'

const props = defineProps<{
  status: ActivityStatus
  /** Overrides the default English label (pass the localized string). */
  label?: string
  chamfer?: boolean
  class?: HTMLAttributes['class']
}>()

const LABEL: Record<ActivityStatus, string> = {
  running: 'Running',
  planning: 'Planning',
  waiting: 'Waiting on you',
  blocked: 'Blocked',
  idle: 'Idle',
  done: 'Done',
}
const plate: Record<ActivityStatus, string> = {
  running: 'bg-pulse text-[color:var(--ink)] px-2.5',
  planning: 'bg-[var(--slate)] text-[color:var(--paper)] px-2.5',
  waiting: 'bg-spark text-[color:var(--ink)] border-(length:--stroke) border-[color:var(--ink)] px-2.5',
  blocked: 'bg-[var(--paper)] text-[color:var(--ink)] border-(length:--stroke) border-[color:var(--ink)]',
  idle: 'bg-[var(--mist)] text-[color:var(--slate)] px-2.5',
  done: 'bg-[var(--paper)] text-[color:var(--ink)] border border-[color:var(--fog)] px-2.5',
}
const text = computed(() => props.label ?? LABEL[props.status])
</script>

<template>
  <span
    data-slot="activity-chip"
    :data-status="status"
    :class="cn(
      'inline-flex h-7 w-fit shrink-0 items-center gap-2 overflow-hidden font-mono text-[0.6875rem] font-medium tracking-[0.08em] uppercase whitespace-nowrap',
      plate[status],
      chamfer ? 'rounded-sm' : 'rounded-none',
      props.class,
    )"
  >
    <svg v-if="status === 'running'" viewBox="0 0 10 10" class="size-2.5 shrink-0" aria-hidden="true">
      <polygon points="1,0 10,5 1,10" fill="var(--ink)" />
    </svg>
    <svg v-else-if="status === 'planning'" viewBox="0 0 10 10" class="size-2.5 shrink-0" aria-hidden="true">
      <polygon points="1,0 10,5 1,10" fill="none" stroke="var(--paper)" stroke-width="1.5" />
      <polygon points="1,0 5.5,2.5 5.5,7.5 1,10" fill="var(--paper)" />
    </svg>
    <svg v-else-if="status === 'waiting'" viewBox="0 0 10 12" class="h-3 w-2.5 shrink-0" aria-hidden="true">
      <path d="M1 1h8L5 6z M1 11h8L5 6z" fill="none" stroke="var(--ink)" stroke-width="1.5" />
    </svg>
    <template v-else-if="status === 'blocked'">
      <span class="activity-hatch w-4.5 self-stretch border-r-(length:--stroke) border-[color:var(--ink)]" aria-hidden="true" />
    </template>
    <svg v-else-if="status === 'idle'" viewBox="0 0 10 10" class="size-2.5 shrink-0" aria-hidden="true">
      <rect x="1" y="4" width="8" height="2" fill="var(--slate)" />
    </svg>
    <svg v-else-if="status === 'done'" viewBox="0 0 24 24" class="size-3 shrink-0" fill="none" stroke="var(--ink)" stroke-width="2.5" aria-hidden="true">
      <path d="M12 2l9 5v10l-9 5-9-5V7z M8 12l3 3 5-6" />
    </svg>
    <span :class="status === 'blocked' ? 'pr-2.5 pl-0.5' : ''">{{ text }}</span>
  </span>
</template>

<style scoped>
/* The BLOCKED mark: a hatched Ink strip — a pattern, so the state survives
   without colour (§14.2). */
.activity-hatch {
  background: repeating-linear-gradient(135deg, var(--ink) 0 2px, var(--paper) 2px 5px);
}
</style>
