<script setup lang="ts">
// The label under every node (§8.2): a title, then a mono meta line. A sub-item
// (§8.8) uses the compact pair — 12px title, 10px meta.
withDefaults(defineProps<{
  title: string
  meta?: string
  sub?: boolean
  /** Title rung for main nodes; larger kinds carry a heavier title. */
  weight?: 'task' | 'goal' | 'milestone' | 'project'
}>(), { weight: 'task' })

const titleClass = {
  task: 'text-[0.8125rem] font-semibold leading-tight',
  goal: 'text-[0.9375rem] font-semibold leading-tight',
  milestone: 'text-[1.0625rem] font-bold leading-tight tracking-[-0.01em]',
  project: 'text-[1.125rem] font-bold leading-tight tracking-[-0.01em]',
}
</script>

<template>
  <span data-slot="graph-node-label" class="flex max-w-full flex-col items-center gap-0.5 text-center">
    <span :class="sub ? 'text-caption font-semibold leading-tight' : titleClass[weight]">{{ title }}</span>
    <span
      v-if="meta"
      class="font-mono tracking-[0.06em] text-subtle-foreground"
      :class="sub ? 'text-[0.625rem]' : 'text-[0.6875rem]'"
    >{{ meta }}</span>
  </span>
</template>
