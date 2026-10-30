<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  SwitchRoot,
  SwitchThumb,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed } from 'vue'
import { cn } from '#/lib/utils'

const props = withDefaults(defineProps<SwitchRootProps & {
  class?: HTMLAttributes['class']
  size?: 'sm' | 'default'
}>(), {
  size: 'default',
})

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'size')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Geometry only (the labmate design's switch): a chip-chamfered track with a
// --stroke edge and a square chip-chamfered puck. default 40×22 with a 14 puck,
// sm 32×18 with a 10 puck. px is 2.5px so the puck sits 4px off the outer edge
// (border 1.5 + 2.5), vertically centred the same; translate = inner width −
// 2 × 2.5 − puck (default 37 − 5 − 14 = 18, sm 29 − 5 − 10 = 14). Color, edge
// color and transition live in style.css ([data-slot="switch"]) — the single
// source, so on / off / locked never drift per call site.
const trackClass = computed(() => ({
  sm: 'w-8 h-[18px]',
  default: 'w-10 h-[22px]',
}[props.size]))

const thumbClass = computed(() => ({
  sm: 'size-2.5 data-[state=checked]:translate-x-3.5',
  default: 'size-3.5 data-[state=checked]:translate-x-4.5',
}[props.size]))
</script>

<template>
  <SwitchRoot
    v-slot="slotProps"
    data-slot="switch"
    :data-size="props.size"
    v-bind="forwarded"
    :class="cn(
      'peer inline-flex shrink-0 cursor-pointer items-center rounded-xs border-(length:--stroke) px-[2.5px] outline-none',
      'focus-visible:ring-2 focus-visible:ring-ring/20',
      'disabled:cursor-not-allowed',
      trackClass,
      props.class,
    )"
  >
    <SwitchThumb
      data-slot="switch-thumb"
      :class="cn(
        'pointer-events-none block rounded-2xs data-[state=unchecked]:translate-x-0',
        thumbClass,
      )"
    >
      <slot
        name="thumb"
        v-bind="slotProps"
      />
    </SwitchThumb>
  </SwitchRoot>
</template>
