<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MateStatus } from './types'
import { computed } from 'vue'
import { cn } from '#/lib/utils'

// Mate status chip (§5.5). The plate is the whole signal, so each status has
// exactly one plate; labels default to English and can be localized via `label`.
// Every mate chip is a FRAMED, square chip (1.5px edge; plain plates take an
// edge the colour of their fill) — chips with an edge are never chamfered.
const props = defineProps<{
  status: MateStatus
  label?: string
  class?: HTMLAttributes['class']
}>()

const plate: Record<MateStatus, string> = {
  'running': 'bg-pulse text-[color:var(--ink)] border-[color:var(--ink)]',
  'planning': 'bg-[var(--slate)] text-[color:var(--paper)] border-[color:var(--slate)]',
  'waiting': 'bg-spark text-[color:var(--ink)] border-[color:var(--ink)]',
  'blocked': 'bg-[var(--paper)] text-[color:var(--ink)] border-[color:var(--ink)]',
  'idle': 'bg-[var(--mist)] text-[color:var(--slate)] border-[color:var(--mist)]',
  'available': 'bg-[var(--paper)] text-[color:var(--ink)] border-[color:var(--ink)]',
  'in-focus': 'bg-[var(--ink)] text-[color:var(--paper)] border-[color:var(--ink)]',
  'away': 'bg-[var(--mist)] text-[color:var(--slate)] border-[color:var(--mist)]',
  'invited': 'bg-[var(--paper)] text-[color:var(--slate)] border-[color:var(--ash)]',
}
const defaults: Record<MateStatus, string> = {
  'running': 'Running',
  'planning': 'Planning',
  'waiting': 'Waiting on you',
  'blocked': 'Blocked',
  'idle': 'Idle',
  'available': 'Available',
  'in-focus': 'In focus',
  'away': 'Away',
  'invited': 'Invited',
}
const text = computed(() => props.label ?? defaults[props.status])
</script>

<template>
  <span
    data-slot="mate-chip"
    :data-status="status"
    :class="cn('inline-flex h-6 w-fit shrink-0 items-center rounded-none border-(length:--stroke) px-2 font-mono text-[0.625rem] font-medium tracking-[0.08em] uppercase whitespace-nowrap', plate[status], props.class)"
  >
    {{ text }}
  </span>
</template>
