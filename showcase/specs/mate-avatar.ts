import type { ComponentSpec } from '../lib/spec'
import { h } from 'vue'
import { HandoffMark } from '#/components/handoff-mark'
import { MateAvatar, MateAvatarStack, MateChip } from '#/components/mate-avatar'

const SIZES = ['sm', 'md', 'lg', 'xl'] as const
const BADGES = ['none', 'running', 'waiting', 'blocked', 'idle'] as const

export const mateAvatarSpec: ComponentSpec = {
  id: 'mate-avatar',
  name: 'MateAvatar',
  description:
    'Shape tells who: a human is a Paper octagon, an agent is a faceted Ink hexagon with a live Pulse plane.',
  descriptionZh:
    '形状说明是谁：人是纸白八边形，agent 是带 Pulse 亮面的多面墨色六边形。',
  controls: [
    { kind: 'enum', key: 'kind', label: 'Kind', options: ['human', 'agent'], default: 'agent', display: 'segmented' },
    { kind: 'enum', key: 'size', label: 'Size', options: SIZES, default: 'xl', display: 'segmented' },
    { kind: 'enum', key: 'badge', label: 'Badge', options: BADGES, default: 'running', when: s => s.kind === 'agent' },
    { kind: 'string', key: 'name', label: 'Name', default: 'Ada Lovelace' },
  ],
  examples: [
    {
      name: 'Stack',
      nameZh: '叠放',
      note: 'Avatars overlap by 10px; agents pick up a Paper outline.',
      render: () => h(MateAvatarStack, null, () => [
        h(MateAvatar, { kind: 'human', name: 'Mira Chen', size: 'lg' }),
        h(MateAvatar, { kind: 'agent', name: 'Scout', size: 'lg' }),
        h(MateAvatar, { kind: 'agent', name: 'Quill', size: 'lg' }),
        h(MateAvatar, { kind: 'human', name: 'Jon Park', size: 'lg' }),
      ]),
    },
    {
      name: 'Mate status',
      nameZh: '成员状态',
      render: () => (['running', 'planning', 'waiting', 'blocked', 'idle', 'available', 'in-focus', 'away', 'invited'] as const)
        .map(status => h(MateChip, { status })),
    },
    {
      name: 'Handoff',
      nameZh: '交接',
      note: 'Work passed from one mate to the next.',
      render: () => h(HandoffMark, { label: 'Handed off' }),
    },
  ],
  render: state => h(MateAvatar, {
    kind: state.kind as never,
    size: state.size as never,
    name: String(state.name),
    badge: state.badge === 'none' ? undefined : state.badge as never,
  }),
}
