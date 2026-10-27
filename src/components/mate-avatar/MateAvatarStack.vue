<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { provide } from 'vue'
import { cn } from '#/lib/utils'
import { MATE_STACK_KEY } from './context'

// Overlapping row of MateAvatars (§5.3): each overlaps the previous by 10px,
// and every avatar takes the heavier stack outline — agents a Paper one so
// they cut cleanly against neighbours. Optional `more` shows the overflow
// count (`+3`) in mono after the stack.
const props = defineProps<{
  more?: number
  class?: HTMLAttributes['class']
}>()

provide(MATE_STACK_KEY, true)
</script>

<template>
  <div
    data-slot="mate-avatar-stack"
    :class="cn('flex items-center [&>[data-slot=mate-avatar]:not(:first-child)]:-ml-2.5', props.class)"
  >
    <slot />
    <span v-if="more" class="ml-3 text-data text-foreground">+{{ more }}</span>
  </div>
</template>
