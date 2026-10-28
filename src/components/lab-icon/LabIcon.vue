<script setup lang="ts">
import type { LabIconName, LabIconSize } from './icons'
import { computed } from 'vue'
import { LAB_ICON_STROKE, LAB_ICONS } from './icons'

// One LabMate icon (§6). `size` picks the rung of the stroke ladder (§6.2):
// 16 → 2px, 20 → 1.75px, 24 → 1.5px, 32 → 1.25px. The stroke never scales
// with the box, so pass the size the icon is drawn at. `solid` marks the active
// or agent-owned state (§6.3): the icon sits on a Pulse chamfered tile and keeps
// its strokes — filling the path broke the open-path icons (panel v2 附录 A).
const props = withDefaults(defineProps<{
  name: LabIconName
  size?: LabIconSize
  solid?: boolean
  /** Accessible name; omit for a decorative icon. */
  label?: string
}>(), { size: 24 })

const stroke = computed(() => LAB_ICON_STROKE[props.size])
</script>

<template>
  <span v-if="solid" data-slot="lab-icon-tile" class="inline-flex shrink-0 items-center justify-center bg-brand text-brand-foreground rounded-md p-1">
    <svg
      data-slot="lab-icon"
      :data-icon="name"
      viewBox="0 0 24 24"
      :width="size"
      :height="size"
      :style="{ width: `${size / 16}rem`, height: `${size / 16}rem` }"
      class="shrink-0"
      fill="none"
      stroke="currentColor"
      stroke-linejoin="miter"
      stroke-linecap="square"
      :role="label ? 'img' : undefined"
      :aria-label="label"
      :aria-hidden="label ? undefined : 'true'"
    >
      <path :d="LAB_ICONS[name]" fill="none" :stroke-width="stroke" vector-effect="non-scaling-stroke" />
    </svg>
  </span>
  <svg
    v-else
    data-slot="lab-icon"
    :data-icon="name"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    :style="{ width: `${size / 16}rem`, height: `${size / 16}rem` }"
    class="shrink-0"
    fill="none"
    stroke="currentColor"
    stroke-linejoin="miter"
    stroke-linecap="square"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <path
      :d="LAB_ICONS[name]"
      fill="none"
      :stroke-width="stroke"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>
