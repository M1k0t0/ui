<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MateAvatarSize, MateBadge, MateKind } from './types'
import { computed } from 'vue'
import { cn } from '#/lib/utils'
import { mateInitials } from './types'

// Mate avatar (§5.1–5.3, §5.6). A HUMAN is a Paper octagon with an Ink outline
// and one Ink facet at the bottom-right; an AGENT is a faceted Ink hexagon whose
// top-left plane is Pulse (the agent is live). Planes are lit from the top-left
// (§2.4). Inside a MateAvatarStack, agents pick up a Paper outline through the
// --mate-ring variable the stack sets.
const props = withDefaults(defineProps<{
  kind: MateKind
  /** Accessible name; initials are derived from it unless `initials` is set. */
  name: string
  initials?: string
  size?: MateAvatarSize
  /** Agent state badge (§5.6). Ignored for humans. */
  badge?: MateBadge
  class?: HTMLAttributes['class']
}>(), { size: 'md' })

const text = computed(() => props.initials ?? mateInitials(props.name))
const label = computed(() => `${props.name} (${props.kind})`)

const sizeClass: Record<MateAvatarSize, string> = {
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
  xl: 'size-14',
}
const badgeClass: Record<MateBadge, string> = {
  running: 'bg-pulse',
  waiting: 'bg-spark',
  blocked: 'bg-[var(--paper)] border-(length:--stroke) border-[color:var(--ink)]',
  idle: 'bg-[var(--mist)]',
}
</script>

<template>
  <span
    data-slot="mate-avatar"
    :data-kind="kind"
    role="img"
    :aria-label="label"
    :class="cn('relative inline-flex shrink-0 select-none', sizeClass[size], props.class)"
  >
    <svg viewBox="0 0 40 40" class="size-full overflow-visible" aria-hidden="true">
      <template v-if="kind === 'human'">
        <polygon
          points="11.7,0 28.3,0 40,11.7 40,28.3 28.3,40 11.7,40 0,28.3 0,11.7"
          fill="var(--paper)"
          stroke="var(--ink)"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />
        <polygon points="40,28.3 28.3,40 32,32" fill="var(--ink)" />
      </template>
      <template v-else>
        <polygon
          points="20,0 37.32,10 37.32,30 20,40 2.68,30 2.68,10"
          fill="none"
          stroke="var(--mate-ring, transparent)"
          stroke-width="3"
          vector-effect="non-scaling-stroke"
        />
        <polygon points="20,20 2.68,10 20,0" fill="var(--pulse)" />
        <polygon points="20,20 20,0 37.32,10" fill="var(--graphite)" />
        <polygon points="20,20 37.32,10 37.32,30" fill="var(--ink)" />
        <polygon points="20,20 37.32,30 20,40" fill="var(--ink)" />
        <polygon points="20,20 20,40 2.68,30" fill="var(--graphite)" />
        <polygon points="20,20 2.68,30 2.68,10" fill="var(--slate)" />
        <polygon points="20,8 30.4,14 30.4,26 20,32 9.6,26 9.6,14" fill="var(--ink)" />
      </template>
      <text
        x="20"
        y="20"
        text-anchor="middle"
        dominant-baseline="central"
        font-size="13"
        font-weight="600"
        :fill="kind === 'human' ? 'var(--ink)' : 'var(--paper)'"
        style="font-family: var(--font-sans)"
      >{{ text }}</text>
    </svg>
    <span
      v-if="badge && kind === 'agent'"
      data-slot="mate-avatar-badge"
      :data-badge="badge"
      :class="cn('absolute -right-0.5 -bottom-0.5 size-[40%] rounded-2xs', badgeClass[badge])"
    />
  </span>
</template>
