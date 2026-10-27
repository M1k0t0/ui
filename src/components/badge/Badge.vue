<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { BadgeVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { cn } from '#/lib/utils'
import { badgeVariants } from '.'

const props = defineProps<PrimitiveProps & {
  variant?: BadgeVariants['variant']
  size?: BadgeVariants['size']
  font?: BadgeVariants['font']
  /** Cut the top-left and bottom-right corners. Square by default. */
  chamfer?: boolean
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants({ variant, size, font, chamfer }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
