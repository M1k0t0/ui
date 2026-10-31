import type { ComponentSpec } from '../lib/spec'
import type { MatePickerCandidate, MatePickerRow } from '#/components/mate-picker'
import { computed, defineComponent, h, ref } from 'vue'
import { MatePicker } from '#/components/mate-picker'

const ROLES = [
  { value: 'owner', label: 'Owner' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]

// Page-local staging, not shared vocabulary: the picker never searches by itself (the host fetches candidates for the
// query), so the demo filters this small static directory to have something to show. Two people share a name and one has
// none, which is why their hint carries an id tail.
const PEOPLE: MatePickerCandidate[] = [
  { id: 'ada', label: 'Ada Lovelace' },
  { id: 'mira', label: 'Mira Chen', hint: 'Already a member · Editor' },
  { id: 'jun-1', label: 'Jun Ruiz', hint: '3b17c4' },
  { id: 'jun-2', label: 'Jun Ruiz', hint: 'b9e2a7' },
  { id: 'sam', label: 'Sam Novak', note: 'Outside allowlist' },
  { id: 'anon', label: 'Unnamed', hint: 'e3f9a1' },
]

// Owns the page state (plain refs) so the picker stays live across control changes.
const MatePickerDemo = defineComponent({
  props: { loading: Boolean, footer: { type: String, default: undefined } },
  setup(props) {
    const query = ref('')
    const selected = ref<MatePickerRow[]>([{ id: 'ada', label: 'Ada Lovelace', role: 'owner' }])
    const candidates = computed(() => {
      const q = query.value.trim().toLowerCase()
      return q === '' ? [] : PEOPLE.filter(p => p.label.toLowerCase().includes(q) || (p.hint ?? '').includes(q))
    })
    return () => h(MatePicker, {
      'query': query.value,
      'onUpdate:query': (v: string) => { query.value = v },
      'selected': selected.value,
      'roles': ROLES,
      'candidates': candidates.value,
      'placeholder': 'Search by name',
      'loading': props.loading,
      'footer': props.footer,
      'onAdd': (c: MatePickerCandidate) => { selected.value = [...selected.value, { id: c.id, label: c.label, role: 'editor', note: c.note }] },
      'onRemove': (id: string) => { selected.value = selected.value.filter(r => r.id !== id) },
      'onUpdate:role': (id: string, role: string) => { selected.value = selected.value.map(r => (r.id === id ? { ...r, role } : r)) },
    })
  },
})

export const matePickerSpec: ComponentSpec = {
  id: 'mate-picker',
  name: 'MatePicker',
  description:
    'Add people by searching. Chosen people are rows (name, role, remove); typing opens the matches under the field — ↑/↓ move, Enter adds, Esc closes.',
  descriptionZh:
    '搜人来加。选上的人一行一个 (名字、角色、移除); 打字后在输入框下列出匹配的人, ↑↓ 选、回车加上、Esc 收起。',
  interactive: true,
  controls: [
    { kind: 'boolean', key: 'loading', label: 'Loading', default: false },
    { kind: 'string', key: 'footer', label: 'Footer', default: '', placeholder: 'Showing the first 8' },
  ],
  render: state => h(MatePickerDemo, { loading: Boolean(state.loading), footer: String(state.footer ?? '') || undefined }),
}
