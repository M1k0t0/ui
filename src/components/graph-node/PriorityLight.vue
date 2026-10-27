<script setup lang="ts">
import type { TaskPriority } from './types'
import { computed } from 'vue'

// Light (§10.4): a faceted 12-sided Pulse halo of three rings behind an
// ongoing task. `lit` is the tracing state (§10.5), brighter than any priority.
const props = defineProps<{
  /** Halo radius in px (the node's light radius). */
  radius: number
  priority?: TaskPriority
  lit?: boolean
}>()

const OPACITY: Record<TaskPriority, [number, number, number]> = {
  p1: [0.16, 0.26, 0.42],
  p2: [0.07, 0.14, 0.26],
  p3: [0, 0, 0.13],
}
const LIT: [number, number, number] = [0.24, 0.36, 0.58]
const o = computed(() => props.lit ? LIT : props.priority ? OPACITY[props.priority] : [0, 0, 0])

function ring(R: number, r: number) {
  return Array.from({ length: 12 }, (_, i) => {
    const a = ((i * 30 + 15) * Math.PI) / 180
    const k = i % 2 ? 0.9 : 1
    return `${(R + Math.cos(a) * r * k).toFixed(1)},${(R + Math.sin(a) * r * k).toFixed(1)}`
  }).join(' ')
}
</script>

<template>
  <svg
    v-if="o[0] || o[1] || o[2]"
    data-slot="priority-light"
    :viewBox="`0 0 ${radius * 2} ${radius * 2}`"
    :width="radius * 2"
    :height="radius * 2"
    class="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2"
    aria-hidden="true"
  >
    <polygon :points="ring(radius, radius)" fill="var(--pulse)" :opacity="o[0]" />
    <polygon :points="ring(radius, radius * 0.78)" fill="var(--pulse)" :opacity="o[1]" />
    <polygon :points="ring(radius, radius * 0.56)" fill="var(--pulse)" :opacity="o[2]" />
  </svg>
</template>
