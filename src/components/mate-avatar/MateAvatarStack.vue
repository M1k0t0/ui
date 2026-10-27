<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '#/lib/utils'

// Overlapping row of MateAvatars (§5.3): each overlaps the previous by 10px,
// and agents get a Paper outline (via --mate-ring) so overlapping hexagons
// stay legible.
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    data-slot="mate-avatar-stack"
    :class="cn('flex items-center [--mate-ring:var(--paper)] [&>*:not(:first-child)]:-ml-2.5', props.class)"
  >
    <slot />
  </div>
</template>
