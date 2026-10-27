<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MateStatus } from './types'
import { computed } from 'vue'
import { cn } from '#/lib/utils'

// Mate status chip (§5.5). The plate is the whole signal, so each status has
// exactly one plate; labels default to English and can be localized via `label`.
const props = defineProps<{
  status: MateStatus
  label?: string
  class?: HTMLAttributes['class']
}>()

const plate: Record<MateStatus, string> = {
  'running': 'bg-pulse text-[color:var(--ink)]',
  'planning': 'bg-[var(--slate)] text-[color:var(--paper)]',
  'waiting': 'bg-spark text-[color:var(--ink)]',
  'blocked': 'bg-[var(--paper)] text-[color:var(--ink)] border-(length:--stroke) border-[color:var(--ink)]',
  'idle': 'bg-[var(--mist)] text-[color:var(--slate)]',
  'available': 'bg-[var(--paper)] text-[color:var(--ink)] border-(length:--stroke) border-[color:var(--ink)]',
  'in-focus': 'bg-[var(--ink)] text-[color:var(--paper)]',
  'away': 'bg-[var(--mist)] text-[color:var(--slate)]',
  'invited': 'bg-[var(--paper)] text-[color:var(--ink)] border-(length:--stroke) border-[color:var(--ash)]',
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
    :class="cn('inline-flex h-6 w-fit shrink-0 items-center rounded-sm px-2 text-label-mono whitespace-nowrap', plate[status], props.class)"
  >
    {{ text }}
  </span>
</template>
