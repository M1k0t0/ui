<script setup lang="ts">
import { PageShell, SectionGroup } from '#/components/settings'
import { RADIUS_SCALE } from '../../lib/foundations-data'
import { tt } from '../../lib/i18n'
import SpecimenTable from '../../components/SpecimenTable.vue'
import SpecimenRow from '../../components/SpecimenRow.vue'
</script>

<template>
  <PageShell
    width="lg"
    :title="tt('Radius', '圆角')"
  >
    <div class="flex flex-col gap-8">
      <SectionGroup
        heading
        :title="tt('Scale', '阶梯')"
      >
        <!-- One-off demo figure, page-unique: fixed-size swatch boxes aligned
             to their bottom edge so the radius reads against a shared
             baseline — a specimen arrangement this page alone needs, not a
             general vocabulary. -->
        <div class="flex flex-wrap items-end gap-6">
          <div
            v-for="r in RADIUS_SCALE"
            :key="r.token"
            class="flex flex-col items-start gap-2"
          >
            <div
              class="h-16 w-24 border-(length:--stroke) border-foreground bg-card"
              :class="r.cls"
            />
            <div class="font-mono text-caption text-muted-foreground">
              {{ r.token }} · {{ r.px }}px
            </div>
          </div>
          <div class="flex flex-col items-start gap-2">
            <div class="size-16 rounded-full border-(length:--stroke) border-foreground bg-card" />
            <div class="font-mono text-caption text-muted-foreground">
              rounded-full · octagon
            </div>
          </div>
        </div>
      </SectionGroup>

      <SectionGroup
        heading
        bare
        :title="tt('Role map', '角色映射')"
        :description="tt(
          'There are no curves. Every rung is a chamfer cut at the top-left and bottom-right (corner-shape: bevel); rounded-full draws an octagon. Off-scale corners are a dirty-pattern red line.',
          '没有曲线。每一档都是左上与右下的切角（corner-shape: bevel）；rounded-full 画成八边形。阶梯外的角是 dirty pattern 红线。',
        )"
      >
        <SpecimenTable>
          <SpecimenRow
            v-for="r in RADIUS_SCALE.filter(r => r.role)"
            :key="r.token"
          >
            <span class="font-mono text-body text-foreground">{{ r.token }} · {{ r.px }}px</span>
            <span class="text-right text-body text-muted-foreground">{{ tt(r.role, r.roleZh) }}</span>
          </SpecimenRow>
        </SpecimenTable>
      </SectionGroup>
    </div>
  </PageShell>
</template>
