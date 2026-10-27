<script setup lang="ts">
import type { WorkStatus } from './types'

// The status glyph alone (§3.3): ▶ filled · ❚❚ filled · ✓ stroke · ✕ stroke ·
// ■ filled · none for not-started. Straight segments, mitred joins, square caps
// (§6.1). Drawn in currentColor so the host plate decides the ink.
defineProps<{ status: WorkStatus }>()
</script>

<template>
  <svg
    v-if="status !== 'not-started'"
    data-slot="status-glyph"
    viewBox="0 0 12 12"
    class="size-3 shrink-0"
    fill="none"
    stroke-linejoin="miter"
    stroke-linecap="square"
    aria-hidden="true"
  >
    <polygon v-if="status === 'ongoing'" points="3,2 10,6 3,10" fill="currentColor" />
    <g v-else-if="status === 'paused'" fill="currentColor">
      <rect x="2.5" y="2" width="2.5" height="8" />
      <rect x="7" y="2" width="2.5" height="8" />
    </g>
    <polyline v-else-if="status === 'completed'" points="2.5,6.5 5,9 9.5,3" stroke="currentColor" stroke-width="2" />
    <g v-else-if="status === 'failed'" stroke="currentColor" stroke-width="2">
      <line x1="3" y1="3" x2="9" y2="9" />
      <line x1="9" y1="3" x2="3" y2="9" />
    </g>
    <rect v-else-if="status === 'halted'" x="2.5" y="2.5" width="7" height="7" fill="currentColor" />
  </svg>
</template>
