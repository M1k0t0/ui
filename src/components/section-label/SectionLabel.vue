<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '#/lib/utils'

// Section label (§4.2): a mono number, a 1.5px Ink rule, a mono title —
// `07 ——— CONTROLS`.
const props = withDefaults(defineProps<{
  index: number | string
  title: string
  as?: string
  class?: HTMLAttributes['class']
}>(), { as: 'div' })

const number = computed(() => typeof props.index === 'number' ? String(props.index).padStart(2, '0') : props.index)
</script>

<template>
  <component
    :is="as"
    data-slot="section-label"
    :class="cn('flex items-center gap-3 text-label-mono text-foreground', props.class)"
  >
    <span>{{ number }}</span>
    <span class="h-(--stroke) w-12 shrink-0 bg-foreground" aria-hidden="true" />
    <span>{{ title }}</span>
  </component>
</template>
