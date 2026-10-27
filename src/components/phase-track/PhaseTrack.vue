<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '#/lib/utils'

// Phase track (§7.5): a row of chevrons. Completed phases are Fog, the current
// phase is Pulse, future phases are Mist. The current phase also carries
// aria-current so the state survives without colour (§14.2).
const props = defineProps<{
  phases: string[]
  /** Index of the current phase. */
  current: number
  class?: HTMLAttributes['class']
}>()

function state(i: number) {
  if (i < props.current) return 'completed'
  if (i === props.current) return 'current'
  return 'future'
}
const stateClass: Record<string, string> = {
  completed: 'bg-border text-foreground',
  current: 'bg-pulse text-on-accent',
  future: 'bg-muted text-muted-foreground',
}
</script>

<template>
  <ol data-slot="phase-track" :class="cn('flex w-full', props.class)">
    <li
      v-for="(phase, i) in phases"
      :key="i"
      data-slot="phase-track-item"
      :data-state="state(i)"
      :aria-current="i === current ? 'step' : undefined"
      :class="cn('phase-chevron flex h-9 min-w-0 flex-1 items-center justify-center px-5 text-label-mono', stateClass[state(i)], i > 0 && '-ml-1.5')"
    >
      <span class="truncate">{{ phase }}</span>
    </li>
  </ol>
</template>

<style scoped>
/* Chevron cut: a 45°-ish point on the right and a matching notch on the left
   (the first item keeps a flat leading edge). Geometry only — no colour. */
.phase-chevron {
  clip-path: polygon(0 0, calc(100% - 0.75rem) 0, 100% 50%, calc(100% - 0.75rem) 100%, 0 100%, 0.75rem 50%);
}
.phase-chevron:first-child {
  clip-path: polygon(0 0, calc(100% - 0.75rem) 0, 100% 50%, calc(100% - 0.75rem) 100%, 0 100%);
}
</style>
