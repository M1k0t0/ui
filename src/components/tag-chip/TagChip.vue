<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '#/lib/utils'

// Tag chip (design doc kanban card: `backend`, `api`): a square Mist plate
// with a lowercase mono label. Tags are free text, so they keep their case —
// unlike status chips, which are uppercase.
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <span
    data-slot="tag-chip"
    :class="cn('inline-flex w-fit shrink-0 items-center bg-[var(--mist)] px-2 py-1 font-mono text-[0.6875rem] leading-none whitespace-nowrap text-[color:var(--graphite)]', props.class)"
  >
    <slot />
  </span>
</template>
