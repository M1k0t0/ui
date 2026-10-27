<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '#/lib/utils'

// Segmented progress (§7.4): one parallelogram per unit of work. Done cells are
// Ink, remaining cells Fog, and the next cell may be Pulse to mark the work in
// flight. Each cell is cut by a 4px slant (the doc's 14px-tall cells).
const props = withDefaults(defineProps<{
  total: number
  done: number
  /** Light the next cell in Pulse (the current unit). */
  current?: boolean
  label?: string
  class?: HTMLAttributes['class']
}>(), { current: true })

const cells = computed(() => Array.from({ length: Math.max(0, props.total) }, (_, i) => {
  if (i < props.done) return 'done'
  if (props.current && i === props.done) return 'current'
  return 'remaining'
}))

const cellClass: Record<string, string> = {
  done: 'bg-foreground',
  current: 'bg-pulse',
  remaining: 'bg-border',
}
</script>

<template>
  <div
    data-slot="segmented-progress"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="total"
    :aria-valuenow="Math.min(done, total)"
    :aria-label="label"
    :class="cn('flex h-3.5 w-full gap-0.75', props.class)"
  >
    <span
      v-for="(state, i) in cells"
      :key="i"
      :data-state="state"
      :class="cn('segment-cell h-full flex-1', cellClass[state])"
    />
  </div>
</template>

<style scoped>
.segment-cell {
  clip-path: polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%);
}
</style>
