import type { ComponentSpec } from '../lib/spec'
import { h } from 'vue'
import { LoadBar } from '#/components/load-bar'
import { PriorityMark } from '#/components/priority-mark'
import { TagChip } from '#/components/tag-chip'

export const tagChipSpec: ComponentSpec = {
  id: 'tag-chip',
  name: 'TagChip',
  description: 'Card marks from the kanban and mate cards: free-text tags, the priority triangles and the load bar.',
  descriptionZh: '看板卡与成员卡上的标记:自由文本标签、优先级三角与负载条。',
  controls: [
    { kind: 'string', key: 'label', label: 'Label', default: 'backend' },
  ],
  examples: [
    {
      name: 'Priority mark',
      nameZh: '优先级标记',
      note: 'Shape carries the level: P1 ▲▲▲, P2 ▲▲△, P3 ▲△△.',
      render: () => (['p1', 'p2', 'p3'] as const).map(priority => h(PriorityMark, { priority })),
    },
    {
      name: 'Load bar',
      nameZh: '负载条',
      note: 'Eight flat cells — Ink for an agent, Slate for a human.',
      render: () => [
        h(LoadBar, { value: 6, kind: 'agent', class: 'max-w-60', label: 'Forge load' }),
        h(LoadBar, { value: 3, kind: 'human', class: 'max-w-60', label: 'Ada load' }),
        h(LoadBar, { value: 6, size: 'sm', class: 'max-w-60', label: 'Task progress' }),
      ],
    },
  ],
  render: state => [h(TagChip, null, () => String(state.label)), h(TagChip, null, () => 'api')],
}
