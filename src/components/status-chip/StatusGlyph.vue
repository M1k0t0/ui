<script setup lang="ts">
import type { WorkStatus } from './types'
import { STATUS_GLYPH } from './glyphs'

// The status glyph alone (§3.3): ▶ filled · ❚❚ filled · ✓ stroke · ✕ stroke ·
// ■ filled · none for not-started. Straight segments, mitred joins, square caps
// (§6.1). Drawn in currentColor so the host plate decides the ink. Filled
// glyphs carry no stroke so the paused bars stay apart at chip size.
defineProps<{ status: WorkStatus }>()
</script>

<template>
  <svg
    v-if="STATUS_GLYPH[status].d"
    data-slot="status-glyph"
    viewBox="0 0 24 24"
    class="size-3 shrink-0"
    aria-hidden="true"
  >
    <path
      :d="STATUS_GLYPH[status].d"
      :fill="STATUS_GLYPH[status].fill ? 'currentColor' : 'none'"
      :stroke="STATUS_GLYPH[status].fill ? 'none' : 'currentColor'"
      stroke-width="2.6"
      stroke-linejoin="miter"
      stroke-linecap="square"
    />
  </svg>
</template>
