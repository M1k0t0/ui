<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '#/lib/utils'

// Away band (§13.23): time a mate is away, as a hatched band labelled AWAY.
// It fills its box; the caller positions it on the week grid.
const props = withDefaults(defineProps<{
  label?: string
  class?: HTMLAttributes['class']
}>(), { label: 'AWAY' })
</script>

<template>
  <span data-slot="away-band" :class="cn('away-hatch relative block h-full w-full', props.class)">
    <span class="absolute bottom-1 left-1.5 bg-[var(--paper)] px-1.25 py-px font-mono text-[0.5625rem] tracking-[0.08em] text-[color:var(--slate)]">{{ label }}</span>
  </span>
</template>

<style scoped>
/* Hatch, not colour, marks absence (§14.2). */
.away-hatch {
  background: repeating-linear-gradient(135deg, var(--well-deep) 0 5px, color-mix(in oklab, var(--paper) 70%, transparent) 5px 11px);
}
</style>
