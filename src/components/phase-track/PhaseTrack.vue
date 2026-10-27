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
  completed: 'bg-[var(--fog)] text-[color:var(--graphite)]',
  current: 'bg-pulse text-on-accent',
  future: 'bg-[var(--mist)] text-[color:var(--slate)]',
}
</script>

<template>
  <ol data-slot="phase-track" :class="cn('flex w-full gap-0.5', props.class)">
    <li
      v-for="(phase, i) in phases"
      :key="i"
      data-slot="phase-track-item"
      :data-state="state(i)"
      :aria-current="i === current ? 'step' : undefined"
      :class="cn('phase-chevron flex h-10 min-w-0 flex-1 items-center justify-center px-5 text-label font-semibold', stateClass[state(i)])"
    >
      <span class="truncate">{{ phase }}</span>
    </li>
  </ol>
</template>

<style scoped>
/* Chevron cut (§7.5): a 14px point on the right and a matching notch on the
   left. The first phase keeps a flat leading edge, the last a flat tail.
   Geometry only — no colour. */
.phase-chevron {
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%, 14px 50%);
}
.phase-chevron:first-child {
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%);
}
.phase-chevron:last-child:not(:first-child) {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 14px 50%);
}
</style>
