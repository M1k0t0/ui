import type { ComponentSpec } from '../lib/spec'
import { h } from 'vue'
import { AwayBand, ScheduleBar } from '#/components/schedule-bar'

const STATUSES = ['ongoing', 'completed', 'paused', 'failed', 'planned', 'handed-off', 'halted'] as const

export const scheduleBarSpec: ComponentSpec = {
  id: 'schedule-bar',
  name: 'ScheduleBar',
  description: 'One piece of work on the weekly schedule. Fill and edge carry the status; planned work is a dashed outline.',
  descriptionZh: '周排期上的一段工作。填充与描边承载状态;计划中的工作是虚线框。',
  controls: [
    { kind: 'enum', key: 'status', label: 'Status', options: STATUSES, default: 'ongoing' },
    { kind: 'boolean', key: 'fromHandoff', label: 'Picked up', default: false },
    { kind: 'boolean', key: 'continuesAfter', label: 'Runs on', default: false },
    { kind: 'boolean', key: 'selected', label: 'Selected', default: false },
    { kind: 'string', key: 'title', label: 'Title', default: 'Run baseline model' },
  ],
  examples: [
    {
      name: 'Every bar',
      nameZh: '全部样式',
      render: () => h('div', { class: 'flex w-full max-w-sm flex-col gap-2' }, STATUSES.map(status =>
        h(ScheduleBar, { status, code: 'LAB-204', title: 'Run baseline model', handedTo: status === 'handed-off' ? 'Ada' : undefined }))),
    },
    {
      name: 'Away',
      nameZh: '离开',
      note: 'Time a mate is away is a hatched band.',
      render: () => h('div', { class: 'h-16 w-60' }, h(AwayBand)),
    },
  ],
  render: state => h('div', { class: 'w-80' }, h(ScheduleBar, {
    status: state.status as never,
    code: 'LAB-204',
    title: String(state.title),
    handedTo: state.status === 'handed-off' ? 'Ada' : undefined,
    fromHandoff: Boolean(state.fromHandoff),
    continuesAfter: Boolean(state.continuesAfter),
    selected: Boolean(state.selected),
  })),
}
