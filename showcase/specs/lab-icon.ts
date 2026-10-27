import type { ComponentSpec } from '../lib/spec'
import { h } from 'vue'
import { LAB_ICON_NAMES, LabIcon } from '#/components/lab-icon'

const SIZES = ['16', '20', '24', '32'] as const

export const labIconSpec: ComponentSpec = {
  id: 'lab-icon',
  name: 'LabIcon',
  description: 'The LabMate icon set: straight segments on a 24px grid, mitred joins, square caps. Smaller icons draw a heavier stroke.',
  descriptionZh: 'LabMate 图标集:24px 网格上的直线段,斜接拐角、方头端点。越小的图标笔画越粗。',
  controls: [
    { kind: 'enum', key: 'name', label: 'Icon', options: LAB_ICON_NAMES, default: 'project', display: 'select' },
    { kind: 'enum', key: 'size', label: 'Size', options: SIZES, default: '24', display: 'segmented' },
    { kind: 'boolean', key: 'solid', label: 'Solid', default: false },
  ],
  examples: [
    {
      name: 'The set',
      nameZh: '完整图标集',
      render: () => LAB_ICON_NAMES.map(name =>
        h('span', { class: 'flex w-20 flex-col items-center gap-2' }, [
          h(LabIcon, { name, size: 24 }),
          h('span', { class: 'text-data text-subtle-foreground' }, name),
        ])),
    },
    {
      name: 'Stroke follows size',
      nameZh: '笔画随尺寸变化',
      note: '16 → 2px, 20 → 1.75px, 24 → 1.5px, 32 → 1.25px.',
      render: () => ([16, 20, 24, 32] as const).map(size => h(LabIcon, { name: 'done', size })),
    },
  ],
  render: state => h(LabIcon, { name: state.name as never, size: Number(state.size) as never, solid: Boolean(state.solid) }),
}
