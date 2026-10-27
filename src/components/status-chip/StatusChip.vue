<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { WorkStatus } from './types'
import { computed } from 'vue'
import { cn } from '#/lib/utils'
import StatusGlyph from './StatusGlyph.vue'
import { WORK_STATUS_LABEL } from './types'

// A work-status chip (§3.3, §7.3): the status base plane + its glyph + a mono
// uppercase label. Colour and glyph always travel together (§14.2) — there is
// no glyph-less or colour-less variant on purpose.
const props = defineProps<{
  status: WorkStatus
  /** Overrides the default English label (pass the localized string). */
  label?: string
  class?: HTMLAttributes['class']
}>()

// Full literal strings so Tailwind's scanner generates every plate.
const plate: Record<WorkStatus, string> = {
  'not-started': 'rounded-none bg-[var(--status-not-started-light)] text-[color:var(--status-not-started-glyph)] border-(length:--stroke) border-[color:var(--fog)]',
  'ongoing': 'rounded-sm bg-[var(--status-ongoing-base)] text-[color:var(--status-ongoing-glyph)]',
  'paused': 'rounded-sm bg-[var(--status-paused-base)] text-[color:var(--status-paused-glyph)]',
  'completed': 'rounded-sm bg-[var(--status-completed-base)] text-[color:var(--status-completed-glyph)]',
  'failed': 'rounded-sm bg-[var(--status-failed-base)] text-[color:var(--status-failed-glyph)]',
  'halted': 'rounded-sm bg-[var(--status-halted-base)] text-[color:var(--status-halted-glyph)]',
}

const text = computed(() => props.label ?? WORK_STATUS_LABEL[props.status])
</script>

<template>
  <span
    data-slot="status-chip"
    :data-status="status"
    :class="cn('inline-flex h-7 w-fit shrink-0 items-center gap-2 px-2.5 text-label-mono whitespace-nowrap [&_svg]:size-2.5', plate[status], props.class)"
  >
    <StatusGlyph :status="status" />
    {{ text }}
  </span>
</template>
