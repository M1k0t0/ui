<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MateAvatarSize, MateBadge, MateKind } from './types'
import { computed, inject } from 'vue'
import { cn } from '#/lib/utils'
import { MATE_STACK_KEY } from './context'
import { mateInitials } from './types'

// Mate avatar (§5.1–5.3, §5.6), drawn on the design doc's 48-unit grid.
//  · HUMAN — a Paper octagon with an Ink outline and one Ink corner facet at
//    the bottom-right. Initials Ink / 600.
//  · AGENT — an Ink hexagon. `faceted` draws all six planes lit from the
//    top-left (Pulse plane = live) with a Paper outline; the compact form is a
//    flat Ink hexagon with one Steel facet, used at small sizes and in stacks.
//    Initials Paper / 700.
// Inside a MateAvatarStack every avatar takes the 2.5-unit stack outline
// (Paper on agents, Ink on humans) and humans drop the corner facet.
const props = withDefaults(defineProps<{
  kind: MateKind
  /** Accessible name; initials are derived from it unless `initials` is set. */
  name: string
  initials?: string
  size?: MateAvatarSize
  /** Agent planes (§5.2). Defaults to on at `xl`, off below. */
  faceted?: boolean
  /** Agent state badge (§5.6). Ignored for humans. */
  badge?: MateBadge
  class?: HTMLAttributes['class']
}>(), { size: 'md', faceted: undefined })

const stacked = inject(MATE_STACK_KEY, false)
const text = computed(() => props.initials ?? mateInitials(props.name))
const label = computed(() => `${props.name} (${props.kind})`)
const showFacets = computed(() => props.faceted ?? props.size === 'xl')

const sizeClass: Record<MateAvatarSize, string> = {
  sm: 'size-7',
  md: 'size-9',
  lg: 'size-11',
  xl: 'size-18',
}

// §5.6 — square badge, bottom-right; the glyph carries the state, not the hue.
const BADGE: Record<MateBadge, { d: string, fill: boolean, bg: string }> = {
  running: { d: 'M7 4l13 8-13 8z', fill: true, bg: 'var(--pulse)' },
  waiting: { d: 'M6 3h12L12 12z M6 21h12L12 12z', fill: false, bg: 'var(--spark)' },
  blocked: { d: 'M8 3h8l5 5v8l-5 5H8l-5-5V8z M7 17L17 7', fill: false, bg: 'var(--paper)' },
  idle: { d: 'M5 11h14v2H5z', fill: true, bg: 'var(--mist)' },
}
const HEX = '24,1 44,12.5 44,35.5 24,47 4,35.5 4,12.5'
const OCT = '14,1 34,1 47,14 47,34 34,47 14,47 1,34 1,14'
</script>

<template>
  <span
    data-slot="mate-avatar"
    :data-kind="kind"
    role="img"
    :aria-label="label"
    :class="cn('relative inline-flex shrink-0 select-none', sizeClass[size], props.class)"
  >
    <svg viewBox="0 0 48 48" class="size-full overflow-visible" aria-hidden="true">
      <template v-if="kind === 'human'">
        <polygon
          :points="OCT"
          fill="var(--paper)"
          stroke="var(--ink)"
          :stroke-width="stacked ? 2.5 : 2"
          stroke-linejoin="miter"
        />
        <polygon v-if="!stacked" points="47,34 34,47 41,40" fill="var(--ink)" />
        <text
          x="24"
          y="29"
          text-anchor="middle"
          font-size="14"
          font-weight="600"
          fill="var(--ink)"
          style="font-family: var(--font-sans)"
        >{{ text }}</text>
      </template>
      <template v-else>
        <template v-if="showFacets && !stacked">
          <g stroke="var(--ink)" stroke-width="0.75" stroke-linejoin="miter">
            <polygon points="24,1 44,12.5 22,22" fill="var(--steel)" />
            <polygon points="44,12.5 44,35.5 22,22" fill="var(--slate)" />
            <polygon points="44,35.5 24,47 22,22" fill="var(--graphite)" />
            <polygon points="24,47 4,35.5 22,22" fill="var(--facet-ink)" />
            <polygon points="4,35.5 4,12.5 22,22" fill="var(--graphite)" />
            <polygon points="4,12.5 24,1 22,22" fill="var(--pulse)" />
          </g>
          <polygon :points="HEX" fill="none" stroke="var(--paper)" stroke-width="1.5" stroke-linejoin="miter" />
        </template>
        <template v-else>
          <polygon
            :points="HEX"
            fill="var(--ink)"
            :stroke="stacked ? 'var(--paper)' : 'var(--agent-edge)'"
            :stroke-width="stacked ? 2.5 : 1.5"
            stroke-linejoin="miter"
          />
          <polygon points="4,12.5 24,1 22,22" fill="var(--steel)" />
        </template>
        <text
          x="24"
          y="30"
          text-anchor="middle"
          font-size="14"
          font-weight="700"
          fill="var(--paper)"
          style="font-family: var(--font-sans)"
        >{{ text }}</text>
      </template>
    </svg>
    <span
      v-if="badge && kind === 'agent'"
      data-slot="mate-avatar-badge"
      :data-badge="badge"
      class="absolute right-[-8.33%] bottom-[-4.17%] flex size-[41.67%] items-center justify-center border-(length:--stroke) border-[color:var(--ink)]"
      :style="{ backgroundColor: BADGE[badge].bg }"
    >
      <svg viewBox="0 0 24 24" class="size-[60%]" aria-hidden="true">
        <path
          :d="BADGE[badge].d"
          :fill="BADGE[badge].fill ? 'var(--ink)' : 'none'"
          stroke="var(--ink)"
          stroke-width="2.5"
          stroke-linejoin="miter"
        />
      </svg>
    </span>
  </span>
</template>
