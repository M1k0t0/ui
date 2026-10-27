<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '#/lib/utils'

// Priority mark (design doc kanban card): three 10px triangles, filled for the
// weight of the priority and outlined for the rest — P1 ▲▲▲, P2 ▲▲△, P3 ▲△△.
// Shape, not colour, carries the level (§14.2).
const props = defineProps<{
  priority: 'p1' | 'p2' | 'p3'
  /** Accessible name; defaults to `Priority P1`. */
  label?: string
  class?: HTMLAttributes['class']
}>()

const filled = computed(() => ({ p1: 3, p2: 2, p3: 1 })[props.priority])
</script>

<template>
  <span
    data-slot="priority-mark"
    :data-priority="priority"
    role="img"
    :aria-label="label ?? `Priority ${priority.toUpperCase()}`"
    :class="cn('inline-flex gap-0.5 text-foreground', props.class)"
  >
    <svg v-for="i in 3" :key="i" viewBox="0 0 10 10" class="size-2.5" aria-hidden="true">
      <polygon v-if="i <= filled" points="5,0 10,10 0,10" fill="currentColor" />
      <polygon v-else points="5,1 9.5,9.5 0.5,9.5" fill="none" stroke="currentColor" stroke-width="1" />
    </svg>
  </span>
</template>
