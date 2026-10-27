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
    'Shape tells who: a human is a Paper octagon with an Ink corner facet; an agent is an Ink hexagon whose top-left plane is Pulse.',
  descriptionZh:
    '形状说明是谁:人是带墨色角面的纸白八边形;agent 是左上面为 Pulse 的墨色六边形。',
  controls: [
    { kind: 'enum', key: 'kind', label: 'Kind', options: ['human', 'agent'], default: 'agent', display: 'segmented' },
    { kind: 'enum', key: 'size', label: 'Size', options: SIZES, default: 'xl', display: 'segmented' },
    { kind: 'enum', key: 'facets', label: 'Agent planes', options: ['auto', 'faceted', 'flat'], default: 'auto', display: 'segmented', when: s => s.kind === 'agent' },
    { kind: 'enum', key: 'badge', label: 'Badge', options: BADGES, default: 'none', when: s => s.kind === 'agent' },
    { kind: 'string', key: 'name', label: 'Name', default: 'Forge' },
  ],
  examples: [
    {
      name: 'Members',
      nameZh: '成员',
      note: 'Humans are octagons, agents faceted hexagons — six planes lit from the top-left.',
      render: () => [
        ...['Ada Lovelace', 'Mira Chen', 'Jun Ruiz', 'Sam Novak'].map(name => h(MateAvatar, { kind: 'human', name, size: 'xl' })),
        ...['Forge', 'Scout', 'Quill', 'Atlas'].map(name => h(MateAvatar, { kind: 'agent', name, size: 'xl' })),
      ],
    },
    {
      name: 'Mixed team stack',
      nameZh: '混合团队叠放',
      note: 'Overlap 10px. Agents get a Paper outline so they cut cleanly against neighbours.',
      render: () => h(MateAvatarStack, { more: 3 }, () => [
        h(MateAvatar, { kind: 'human', name: 'Ada Lovelace', size: 'lg' }),
        h(MateAvatar, { kind: 'agent', name: 'Forge', size: 'lg' }),
        h(MateAvatar, { kind: 'human', name: 'Mira Kahn', size: 'lg' }),
        h(MateAvatar, { kind: 'agent', name: 'Scout', size: 'lg' }),
      ]),
    },
    {
      name: 'Agent state badges',
      nameZh: 'Agent 状态角标',
      note: 'Square badge, bottom-right. The glyph carries the state.',
      render: () => (['running', 'waiting', 'blocked', 'idle'] as const)
        .map(badge => h(MateAvatar, { kind: 'agent', name: 'Forge', initials: '', size: 'lg', badge })),
    },
    {
      name: 'Handoff',
      nameZh: '交接',
      note: 'Hex → octagon reads as "agent hands to human".',
      render: () => h(HandoffMark, { from: 'Forge', to: 'Ada Lovelace' }),
    },
    {
      name: 'Mate status',
      nameZh: '成员状态',
      note: 'Framed square chips — a chip with an edge is never chamfered.',
      render: () => (['running', 'planning', 'waiting', 'blocked', 'idle', 'available', 'in-focus', 'away', 'invited'] as const)
        .map(status => h(MateChip, { status })),
    },
  ],
  render: state => h(MateAvatar, {
    kind: state.kind as never,
    size: state.size as never,
    name: String(state.name),
    faceted: state.facets === 'auto' ? undefined : state.facets === 'faceted',
    badge: state.badge === 'none' ? undefined : state.badge as never,
  }),
}
