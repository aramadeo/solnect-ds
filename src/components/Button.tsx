import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/cn';
import { renderIcon, type IconProp } from './Icon';

/**
 * Figma: Button
 *   Size    = Small | Medium | Large
 *   Variant = Primary | Secondary | Tertiary | Danger
 *   Type    = Solid | Outlined | Ghost   → prop 이름은 `appearance` (HTML button 의 type 과 충돌 방지)
 *   State   = Default | Hover | Disabled → :hover / disabled 속성으로 처리
 *   Label, Leading Icon, Trailing Icon   → label, leadingIcon, trailingIcon
 */

// Figma 에 존재하는 Variant × Type 조합만 허용
type ButtonStyle =
  | { variant?: 'primary' | 'danger'; appearance?: 'solid' | 'outlined' }
  | { variant: 'secondary'; appearance?: 'solid' | 'outlined' | 'ghost' }
  | { variant: 'tertiary'; appearance?: 'solid' };

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type ButtonAppearance = 'solid' | 'outlined' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

const buttonVariants = cva(
  [
    'group inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand-default focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        small: '[--btn-px:var(--spacing-inline-md)] h-control-xs min-w-48 gap-gap-xs rounded-xs text-label-xs-medium',
        medium: '[--btn-px:var(--spacing-inline-lg)] h-control-md min-w-64 gap-gap-xs rounded-xs text-label-md-medium',
        large: '[--btn-px:var(--spacing-inline-xxl)] h-control-lg min-w-80 gap-gap-sm rounded-sm text-label-lg-medium',
      },
      variant: { primary: '', secondary: '', tertiary: '', danger: '' },
      appearance: {
        solid: 'px-[var(--btn-px)] disabled:bg-action-disabled disabled:text-text-disabled',
        // Figma 의 stroke 는 inside 라 폭에 포함되지 않으므로 테두리 두께만큼 패딩을 줄임
        outlined: [
          'border px-[calc(var(--btn-px)-var(--border-width-1))]',
          'disabled:border-border-disabled disabled:text-text-disabled',
        ],
        ghost:
          'px-[var(--btn-px)] bg-surface-transparent-white disabled:bg-surface-transparent-white disabled:text-text-disabled',
      },
    },
    compoundVariants: [
      // Solid
      {
        variant: 'primary',
        appearance: 'solid',
        className: 'bg-action-primary-default text-text-inverse enabled:hover:bg-action-primary-hover',
      },
      {
        variant: 'secondary',
        appearance: 'solid',
        className: 'bg-action-secondary-default text-text-inverse enabled:hover:bg-action-secondary-hover',
      },
      {
        variant: 'tertiary',
        appearance: 'solid',
        className:
          'bg-action-tertiary-strong-default text-text-secondary enabled:hover:bg-action-tertiary-strong-hover',
      },
      {
        variant: 'danger',
        appearance: 'solid',
        className: 'bg-action-danger-default text-text-inverse enabled:hover:bg-action-danger-hover',
      },
      // Outlined
      {
        variant: 'primary',
        appearance: 'outlined',
        className:
          'bg-surface-default border-border-brand-default text-text-brand-default enabled:hover:bg-action-primary-subtle',
      },
      {
        variant: 'secondary',
        appearance: 'outlined',
        className: [
          'bg-surface-default border-border-input-default text-text-secondary',
          'enabled:hover:bg-action-tertiary-default enabled:hover:border-border-tertiary-default',
          'disabled:bg-transparent',
        ],
      },
      {
        variant: 'danger',
        appearance: 'outlined',
        className:
          'bg-surface-default border-border-danger-default text-text-negative enabled:hover:bg-action-danger-subtle',
      },
      // Ghost
      {
        variant: 'secondary',
        appearance: 'ghost',
        className: 'text-text-secondary enabled:hover:bg-action-tertiary-hover',
      },
    ],
    defaultVariants: { size: 'medium', variant: 'primary', appearance: 'solid' },
  }
);

// 아이콘 색은 text 토큰이 아니라 Figma 의 icon/* 토큰을 따릅니다.
const iconColor: Record<ButtonAppearance, Partial<Record<ButtonVariant, string>>> = {
  solid: {
    primary: 'text-icon-inverse',
    secondary: 'text-icon-inverse',
    tertiary: 'text-icon-secondary',
    danger: 'text-icon-inverse',
  },
  outlined: {
    primary: 'text-icon-brand-default',
    secondary: 'text-icon-secondary',
    danger: 'text-icon-negative',
  },
  ghost: { secondary: 'text-icon-secondary' },
};

const iconSize = { small: 'sm', medium: 'md', large: 'lg' } as const;

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  ButtonStyle & {
    size?: ButtonSize;
    /** 버튼 텍스트 (Figma: Label) */
    label: ReactNode;
    /** 앞쪽 아이콘. 아이콘 이름 또는 엘리먼트. 없으면 표시하지 않음 */
    leadingIcon?: IconProp;
    /** 뒤쪽 아이콘 */
    trailingIcon?: IconProp;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    size = 'medium',
    variant = 'primary',
    appearance = 'solid',
    label,
    leadingIcon,
    trailingIcon,
    className,
    type = 'button',
    ...props
  },
  ref
) {
  const iconClass = cn(iconColor[appearance][variant], 'group-disabled:text-icon-disabled');

  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ size, variant, appearance }), className)}
      {...props}
    >
      {leadingIcon && renderIcon(leadingIcon, iconSize[size], iconClass)}
      <span className="text-center">{label}</span>
      {trailingIcon && renderIcon(trailingIcon, iconSize[size], iconClass)}
    </button>
  );
});
