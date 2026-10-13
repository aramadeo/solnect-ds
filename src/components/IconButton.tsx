import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/cn';
import { renderIcon, type IconProp } from './Icon';

/**
 * Figma: Icon Button
 *   Size       = XSmall | Small | Medium | Large
 *   Variant    = Primary | Secondary | Tertiary
 *   Appearance = Solid | Outlined | Ghost
 *   Radius     = Rounded | Circular
 *   State      = Default | Hover | Disabled → :hover / disabled 속성으로 처리
 */

// Figma 에 존재하는 Variant × Appearance 조합만 허용
type IconButtonStyle =
  | { variant?: 'primary'; appearance?: 'solid' | 'outlined' }
  | { variant: 'secondary'; appearance?: 'solid' | 'outlined' | 'ghost' }
  | { variant: 'tertiary'; appearance?: 'solid' };

type IconButtonVariant = 'primary' | 'secondary' | 'tertiary';
type IconButtonAppearance = 'solid' | 'outlined' | 'ghost';
export type IconButtonSize = 'xsmall' | 'small' | 'medium' | 'large';

const iconButtonVariants = cva(
  [
    'group inline-flex shrink-0 items-center justify-center transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand-default focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        xsmall: 'size-control-xxxs rounded-full',
        small: 'size-control-sm rounded-xxs',
        medium: 'size-control-md rounded-xs',
        large: 'size-control-lg rounded-xs',
      },
      radius: { rounded: '', circular: 'rounded-full' },
      variant: { primary: '', secondary: '', tertiary: '' },
      appearance: {
        solid: 'disabled:bg-action-disabled',
        outlined: 'border bg-surface-default disabled:bg-transparent disabled:border-border-disabled',
        ghost: 'bg-surface-transparent-white disabled:bg-surface-transparent-white',
      },
    },
    compoundVariants: [
      { variant: 'primary', appearance: 'solid', className: 'bg-action-primary-default enabled:hover:bg-action-primary-hover' },
      { variant: 'secondary', appearance: 'solid', className: 'bg-action-secondary-default enabled:hover:bg-action-secondary-hover' },
      {
        variant: 'tertiary',
        appearance: 'solid',
        className: 'bg-action-tertiary-strong-default enabled:hover:bg-action-tertiary-strong-hover',
      },
      {
        variant: 'primary',
        appearance: 'outlined',
        className: 'border-border-brand-default enabled:hover:bg-action-primary-subtle enabled:hover:border-border-brand-hover',
      },
      {
        variant: 'secondary',
        appearance: 'outlined',
        className:
          'border-border-input-default enabled:hover:bg-action-tertiary-default enabled:hover:border-border-tertiary-default',
      },
      { variant: 'secondary', appearance: 'ghost', className: 'enabled:hover:bg-action-tertiary-hover' },
    ],
    defaultVariants: { size: 'medium', radius: 'rounded', variant: 'primary', appearance: 'solid' },
  }
);

const iconColor: Record<IconButtonAppearance, Partial<Record<IconButtonVariant, string>>> = {
  solid: { primary: 'text-icon-inverse', secondary: 'text-icon-inverse', tertiary: 'text-icon-secondary' },
  outlined: { primary: 'text-icon-brand-default group-enabled:group-hover:text-icon-brand-hover', secondary: 'text-icon-secondary' },
  ghost: { secondary: 'text-icon-secondary' },
};

const iconSize = { xsmall: 'xs', small: 'sm', medium: 'md', large: 'lg' } as const;

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  IconButtonStyle & {
    size?: IconButtonSize;
    radius?: 'rounded' | 'circular';
    /** 아이콘 이름 또는 엘리먼트 */
    icon: IconProp;
    /** 텍스트가 없으므로 접근성 이름은 필수 */
    'aria-label': string;
  };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    size = 'medium',
    radius = 'rounded',
    variant = 'primary',
    appearance = 'solid',
    icon,
    className,
    type = 'button',
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(iconButtonVariants({ size, radius, variant, appearance }), className)}
      {...props}
    >
      {renderIcon(icon, iconSize[size], cn(iconColor[appearance][variant], 'group-disabled:text-icon-disabled'))}
    </button>
  );
});
