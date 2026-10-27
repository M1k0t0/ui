<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '#/lib/utils'

// The handoff mark (§5.4): agent hexagon → arrow → human octagon. Reads "work
// passed from one mate to the next". Pass `label` when it stands alone; inside
// labelled text it can stay decorative.
const props = defineProps<{
  label?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <svg
    data-slot="handoff-mark"
    viewBox="0 0 44 16"
    :class="cn('h-4 w-11 shrink-0', props.class)"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    stroke-linejoin="miter"
    stroke-linecap="square"
  >
    <polygon points="7,1 13.06,4.5 13.06,11.5 7,15 0.94,11.5 0.94,4.5" fill="currentColor" />
    <line x1="16.5" y1="8" x2="25.5" y2="8" stroke="currentColor" stroke-width="1.5" />
    <polyline points="23,5 26,8 23,11" fill="none" stroke="currentColor" stroke-width="1.5" />
    <polygon
      points="33.7,1.5 38.3,1.5 42.5,5.7 42.5,10.3 38.3,14.5 33.7,14.5 29.5,10.3 29.5,5.7"
      fill="var(--paper)"
      stroke="currentColor"
      stroke-width="1.5"
    />
  </svg>
</template>
