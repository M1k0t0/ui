import type { ComponentSpec } from '../lib/spec'
import { h } from 'vue'
import { PhaseTrack } from '#/components/phase-track'
import { SectionLabel } from '#/components/section-label'
import { SegmentedProgress } from '#/components/segmented-progress'

export const segmentedProgressSpec: ComponentSpec = {
  id: 'segmented-progress',
  name: 'SegmentedProgress',
  description:
    'Counted progress as slanted cells: done in Ink, remaining in Fog, the work in flight in Pulse.',
  descriptionZh:
    '以斜切格表示计数进度：完成为墨色，剩余为 Fog，进行中为 Pulse。',
  controls: [
    { kind: 'number', key: 'total', label: 'Total', default: 8, min: 1, max: 24 },
    { kind: 'number', key: 'done', label: 'Done', default: 3, min: 0, max: 24 },
    { kind: 'boolean', key: 'current', label: 'Current cell', default: true },
  ],
  examples: [
    {
      name: 'Phase track',
      nameZh: '阶段轨',
      note: 'Completed phases are Fog, the current phase Pulse, future phases Mist.',
      render: () => h(PhaseTrack, { phases: ['Plan', 'Run', 'Analyse', 'Write', 'Submit'], current: 2, class: 'max-w-xl' }),
    },
    {
      name: 'Section label',
      nameZh: '分区标签',
      render: () => h(SectionLabel, { index: 7, title: 'Controls' }),
    },
  ],
  render: state => h(SegmentedProgress, {
    total: Number(state.total),
    done: Number(state.done),
    current: Boolean(state.current),
    label: 'Progress',
    class: 'max-w-sm',
  }),
}
