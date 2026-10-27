import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'
export { default as BadgeCount } from './BadgeCount.vue'

export const badgeVariants = cva(
  // A calm status chip: pill, flat soft-tint surface, NO border (only `outline` opts
  // back into a hairline). Colours come from the accent palette's soft ramp — a
  // low-saturation -soft-active fill paired with the same-hue -deep text. This auto
  // adapts in dark mode (the ramp flips to a translucent dark tint + light text), so
  // one set of tokens covers both themes. Box metrics (px/py) live in `size`; text
  // size is size-invariant (text-caption) so it sits here in the base.
  'inline-flex items-center justify-center rounded-sm text-label-mono w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-accent text-foreground [a&]:hover:bg-muted',
        secondary:
          'bg-muted text-muted-foreground [a&]:hover:bg-accent',
        destructive:
          'bg-destructive text-on-accent [a&]:hover:bg-destructive-hover',
        success:
          'bg-success text-on-accent',
        warning:
          'bg-warning text-on-accent',
        info:
          'bg-info text-on-accent',
        outline:
          'rounded-none border-(length:--stroke) border-foreground bg-background text-foreground [a&]:hover:bg-accent',
      },
      size: {
        default: 'h-6 px-2',
        // px-[0.4375rem] (≈7px): a hair more breathing room than px-1.5 (6px) so the
        // compact chip doesn't read as cramped, without growing to the full default px-2.
        sm: 'h-5 px-1.5',
      },
      // Opt-in monospace for chips that carry a technical value — a match score,
      // a cron pattern, a platform/provider key. Orthogonal to the base font-medium
      // (that sets weight, this sets family), so mono chips stay medium-weight. Kept
      // as a variant rather than left to callers' `class` so the tool-call surface's
      // "technical metadata reads as mono" convention lands on one owner instead of
      // being hand-rolled per detail panel.
      font: {
        sans: '',
        mono: 'font-mono',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      font: 'sans',
    },
  },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>

// Single source of truth for the variant/size/font axes. cva 0.7.1 does not
// expose its `.config` at runtime, so the keys are mirrored here next to the
// cva call (keep them in sync). Consumed by the showcase specs so the
// controls panel never hand-maintains its own list.
export const badgeVariantKeys = [
  'default',
  'secondary',
  'destructive',
  'success',
  'warning',
  'info',
  'outline',
] as const satisfies readonly NonNullable<BadgeVariants['variant']>[]

export const badgeSizeKeys = [
  'default',
  'sm',
] as const satisfies readonly NonNullable<BadgeVariants['size']>[]

export const badgeFontKeys = [
  'sans',
  'mono',
] as const satisfies readonly NonNullable<BadgeVariants['font']>[]
