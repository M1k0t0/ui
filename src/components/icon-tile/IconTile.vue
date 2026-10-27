<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '#/lib/utils'

// Icon tile (§6.3): an icon on a chamfered plate. Active (or agent-owned) icons
// sit on Pulse; idle tiles are transparent. Pass a lucide component in the slot.
const props = defineProps<{
  active?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="icon-tile"
    :data-active="active ? '' : undefined"
    :class="cn(
      'inline-flex size-11 shrink-0 items-center justify-center rounded-md [&_svg:not([class*=size-])]:size-5',
      active ? 'bg-pulse text-on-accent' : 'text-foreground',
      props.class,
    )"
  >
    <slot />
  </span>
</template>
