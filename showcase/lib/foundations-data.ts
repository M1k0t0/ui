// Static foundation scales — the values here are CONSTANTS (they don't change
// with theme), transcribed from style.css `@theme inline` and the
// AGENTS.md contract sections. The z ladder values are additionally pinned by
// the host guard (check-ui-contract.mjs hard-fails any off-ladder z), so the
// Layers table can't silently drift. If a scale here ever disagrees with
// style.css, style.css is right — update this file.
// role/what fields carry a zh twin (roleZh/whatZh) for the locale toggle;
// token names and class names are never translated.

export const TYPE_SCALE = [
  { cls: 'text-display', px: 56, rem: '3.5rem', lh: '1.05', role: 'Display', roleZh: '展示' },
  { cls: 'text-heading', px: 32, rem: '2rem', lh: '1.15', role: 'H1 — dialog / page headings', roleZh: 'H1——对话框 / 页面标题' },
  { cls: 'text-title', px: 20, rem: '1.25rem', lh: '1.3', role: 'H2 — card / section / sheet titles', roleZh: 'H2——卡片 / 分区 / 抽屉标题' },
  { cls: 'text-control', px: 15, rem: '0.9375rem', lh: '1.25rem', role: 'Buttons, compact titles', roleZh: '按钮、紧凑标题' },
  { cls: 'text-body', px: 15, rem: '0.9375rem', lh: '1.55', role: 'Body', roleZh: '正文' },
  { cls: 'text-label', px: 14, rem: '0.875rem', lh: '1.25rem', role: 'Form labels, emphasized small', roleZh: '表单标签、小号强调' },
  { cls: 'text-caption', px: 12, rem: '0.75rem', lh: '1rem', role: 'Tiny meta', roleZh: '微型元信息' },
  { cls: 'text-label-mono', px: 11, rem: '0.6875rem', lh: '1rem', role: 'Mono UPPERCASE labels, chips, section labels', roleZh: '等宽大写标签、chip、分区标签' },
  { cls: 'text-data', px: 12, rem: '0.75rem', lh: '1rem', role: 'Mono IDs (LAB-nnn), metrics, logs', roleZh: '等宽 ID（LAB-nnn）、指标、日志' },
] as const

export const WEIGHT_ROLES = [
  { cls: 'font-semibold', value: 600, role: 'Display / H1 / H2 / surface titles', roleZh: '展示 / H1 / H2 / 表面标题' },
  { cls: 'font-medium', value: 500, role: 'Labels, button text, chips, emphasis', roleZh: '标签、按钮文字、chip、强调' },
  { cls: 'font-normal', value: 400, role: 'Body, descriptions, field values, placeholder', roleZh: '正文、描述、字段值、占位符' },
] as const

export const FONT_STACKS = [
  {
    token: '--font-sans',
    value: '\'Space Grotesk Variable\', \'Space Grotesk\', \'MiSans\', \'PingFang SC\', \'Hiragino Sans GB\', \'Microsoft YaHei UI\', \'Noto Sans SC\'',
  },
  {
    token: '--font-mono',
    value: '\'JetBrains Mono Variable\', \'JetBrains Mono\', ui-monospace, SFMono-Regular, Menlo, monospace',
  },
] as const

export const SPACING_STEPS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16] as const

// Chamfers, not radii: each rung cuts the top-left and bottom-right corners only.
export const RADIUS_SCALE = [
  { token: '--chamfer-chip', px: 4, cls: 'rounded-sm', role: 'Chips, badges, tooltips, Kbd (also rounded-2xs / rounded-xs)', roleZh: 'chip、徽章、Tooltip、Kbd（rounded-2xs / rounded-xs 同档）' },
  { token: '--chamfer-control', px: 8, cls: 'rounded-md', role: 'Controls (buttons, inputs) & menu rows', roleZh: '控件（按钮、输入框）与菜单行' },
  { token: '--chamfer-card', px: 12, cls: 'rounded-xl', role: 'Cards, menu shells, ActionCard (also rounded-lg)', roleZh: '卡片、菜单壳、ActionCard（rounded-lg 同档）' },
  { token: '--chamfer-panel', px: 16, cls: 'rounded-panel', role: 'Panels — Dialog / Sheet', roleZh: '面板——Dialog / Sheet' },
] as const

export const ELEVATION_SCALE = [
  { token: '--shadow-hairline', role: 'The 1.5px Ink frame on secondary/outline buttons (a shadow only so it animates with hover)', roleZh: 'secondary/outline 按钮的 1.5px 墨线框（只是为了让边随 hover 动画）' },
  { token: '--shadow-thumb', role: 'none — the segmented thumb is a flat Ink plate', roleZh: 'none——分段控件滑块是平的墨色板' },
  { token: '--shadow-dropdown', role: 'none — floating menus separate by a 1.5px Ink border', roleZh: 'none——浮层菜单靠 1.5px 墨线分隔' },
  { token: '--shadow-modal', role: 'none — modals separate by the scrim + a 1.5px Ink border', roleZh: 'none——模态层靠遮罩 + 1.5px 墨线分隔' },
] as const

export const MOTION_DURATIONS = [
  { ms: 40, what: 'Toggle press', whatZh: 'Toggle 按下' },
  { ms: 70, what: 'Field edge', whatZh: '输入框边缘' },
  { ms: 110, what: 'Switch track + thumb glide', whatZh: 'Switch 轨道 + 滑块' },
  { ms: 150, what: 'Button color', whatZh: '按钮颜色' },
  { ms: 160, what: 'Toggle release', whatZh: 'Toggle 释放' },
  { ms: 180, what: 'Accordion reveal', whatZh: '折叠展开' },
  { ms: 220, what: 'AutoHeight swap / theme crossfade', whatZh: 'AutoHeight 切换 / 换肤渐变' },
  { ms: 250, what: 'SegmentedControl thumb', whatZh: 'SegmentedControl 滑块' },
  { ms: 255, what: 'Button press-scale (spring)', whatZh: '按钮按下缩放(弹簧)' },
] as const

export const MOTION_EASINGS = [
  { name: 'House spring', value: 'cubic-bezier(0.32, 0.72, 0, 1)', what: 'AutoHeight and other size tweens', whatZh: 'AutoHeight 等尺寸补间' },
  { name: 'Ease-out', value: 'cubic-bezier(0.22, 1, 0.36, 1)', what: 'Theme crossfade, overlays', whatZh: '换肤渐变、浮层' },
  { name: 'Press spring', value: 'linear(…) spring', what: 'Button press-scale — springy, never a straight ease', whatZh: '按钮按下缩放——弹簧感,绝不用直线缓动' },
] as const

export const Z_LADDER = [
  { token: '--z-raised', value: 10, role: 'Local elevation: sticky top-fades, resize rails, overlay badges', roleZh: '局部抬升:吸顶渐隐、拖拽轨道、悬浮徽章' },
  { token: '--z-sticky', value: 20, role: 'Sticky bars and hand-rolled popovers/rails within a panel', roleZh: '吸顶栏、面板内手写浮层/轨道' },
  { token: '--z-panel', value: 30, role: 'Panel-level floats: composer, minimap, app-level view switches', roleZh: '面板级浮层:输入坞、缩略图、视图切换' },
  { token: '--z-overlay', value: 50, role: 'Every reka floating layer: dialog/sheet/popover/tooltip/menu', roleZh: '所有 reka 浮层:对话框/抽屉/Popover/Tooltip/菜单' },
  { token: '--z-top', value: 100, role: 'Lightbox / full-screen top layer', roleZh: '灯箱 / 全屏顶层' },
] as const

export const ICON_SIZE_LADDER = [
  { px: 16, role: 'Default controls (buttons, fields, menus)', roleZh: '默认控件(按钮、输入框、菜单)' },
  { px: 14, role: 'Small in-field controls (clear / reveal / steppers)', roleZh: '框内小控件(清除 / 显隐 / 步进)' },
  { px: 12, role: 'Text-scale affordances (TextButton, crumbs) and badges', roleZh: '文字级操作(TextButton、面包屑)与徽章' },
] as const
