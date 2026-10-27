import { reactive } from 'vue'

// Theme switching is driven exactly like the host app: dark mode is a `.dark`
// class on <html> (style.css `@custom-variant dark (&:is(.dark *))`). There is
// one palette — LabMate's two inks — so there is no color-scheme axis.
// Deliberately self-contained, no host settings-store dependency.
export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'felinic-showcase-theme'

function load(): { theme: ThemeMode } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (typeof parsed === 'object' && parsed !== null) {
        const p = parsed as Record<string, unknown>
        if (p.theme === 'light' || p.theme === 'dark') {
          return { theme: p.theme }
        }
      }
    }
  }
  catch {
    // Corrupted / unavailable storage → fall through to defaults.
  }
  return { theme: 'light' }
}

export const themeState = reactive(load())

export function applyTheme(theme: ThemeMode) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(themeState))
  }
  catch {
    // Storage unavailable — theme still works for the session.
  }
}

// Instant swap, no View Transitions crossfade — the host's own rationale
// (store/settings): the control already animates its own feedback, and
// wrapping the flip in startViewTransition freezes the page for the
// transition's duration, swallows hover, and — worse here — captures the
// OPEN dropdown in the old snapshot, so the menu visibly morphs
// instead of snapping shut. It also raced persistence: persist() ran
// synchronously after startViewTransition scheduled its callback, so the
// PREVIOUS theme was what landed in storage (state lost on every reload).
function commit(mutate: () => void) {
  mutate()
  applyTheme(themeState.theme)
  persist()
}

export function setTheme(theme: ThemeMode) {
  if (themeState.theme === theme) return
  commit(() => (themeState.theme = theme))
}

