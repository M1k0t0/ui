<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '#/lib/utils'
import { MateAvatar } from '../mate-avatar'

// The handoff mark (§5.4): agent hexagon → arrow → human octagon. Reads "work
// passed from one mate to the next" — on cards, timeline and notifications.
// `from` / `to` are the two mates' names (initials are derived).
const props = withDefaults(defineProps<{
  from: string
  to: string
  fromKind?: 'agent' | 'human'
  toKind?: 'agent' | 'human'
  size?: 'sm' | 'lg'
  class?: HTMLAttributes['class']
}>(), { fromKind: 'agent', toKind: 'human', size: 'lg' })
</script>

<template>
  <span
    data-slot="handoff-mark"
    role="img"
    :aria-label="`Handed off from ${from} to ${to}`"
    :class="cn('inline-flex items-center gap-2', props.class)"
  >
    <MateAvatar :kind="fromKind" :name="from" :size="size" :faceted="false" aria-hidden="true" />
    <svg
      viewBox="0 0 56 16"
      :class="size === 'lg' ? 'h-4 w-14' : 'h-2.5 w-4.5'"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="miter"
      aria-hidden="true"
    >
      <path d="M0 8h52 M46 2l6 6-6 6" />
    </svg>
    <MateAvatar :kind="toKind" :name="to" :size="size" aria-hidden="true" />
  </span>
</template>
