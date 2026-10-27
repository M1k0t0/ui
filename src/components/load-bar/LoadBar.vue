<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '#/lib/utils'

// Load bar (§12.1): a row of flat cells — how much a mate is holding. Filled
// cells are Ink for an agent, Slate for a human; empty cells are Well-deep.
// For counted progress toward a goal use SegmentedProgress (slanted cells).
const props = withDefaults(defineProps<{
  /** Filled cells. */
  value: number
  /** Total cells (the doc's mate card uses 8). */
  cells?: number
  kind?: 'agent' | 'human'
  /** Cell height: `sm` 6px (task cards), `md` 8px (mate cards). */
  size?: 'sm' | 'md'
  label?: string
  class?: HTMLAttributes['class']
}>(), { cells: 8, kind: 'agent', size: 'md' })

const filled = computed(() => Math.max(0, Math.min(props.cells, props.value)))
</script>

<template>
  <span
    data-slot="load-bar"
    role="meter"
    :aria-valuemin="0"
    :aria-valuemax="cells"
    :aria-valuenow="filled"
    :aria-label="label ?? 'Load'"
    :class="cn('flex w-full gap-0.5', props.class)"
  >
    <span
      v-for="i in cells"
      :key="i"
      :class="cn(
        'flex-1',
        size === 'sm' ? 'h-1.5' : 'h-2',
        i <= filled ? (kind === 'agent' ? 'bg-foreground' : 'bg-subtle-foreground') : 'bg-cell-empty',
      )"
    />
  </span>
</template>
