import { forwardRef, type HTMLAttributes, type LiHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Icon } from './Icon';

/**
 * Figma: Inputs/Select Options (type = default | category)
 *        Select Options/Item     (UnSelected | Hover | Selected)
 *        Select Options/Category
 */
export const SelectOptions = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(function SelectOptions(
  { className, ...props },
  ref
) {
  return (
    <ul
      ref={ref}
      role="listbox"
      className={cn(
        'flex flex-col overflow-y-auto rounded-sm border border-border-default bg-surface-default shadow-menu',
        // type=category: 그룹 사이 구분선
        '[&>[role=group]]:border-b [&>[role=group]]:border-border-default [&>[role=group]:last-child]:border-b-0',
        // type=default: 그룹 없이 아이템만 있을 때의 내부 여백
        '[&:not(:has(>[role=group]))]:px-inline-sm [&:not(:has(>[role=group]))]:py-stack-sm',
        className
      )}
      {...props}
    />
  );
});

export interface SelectOptionProps extends LiHTMLAttributes<HTMLLIElement> {
  selected?: boolean;
  /** 키보드 탐색 중 강조 (Figma: Hover) */
  active?: boolean;
  disabled?: boolean;
}

export const SelectOption = forwardRef<HTMLLIElement, SelectOptionProps>(function SelectOption(
  { selected, active, disabled, className, children, ...props },
  ref
) {
  return (
    <li
      ref={ref}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      className={cn(
        'flex h-control-md shrink-0 cursor-pointer items-center gap-gap-sm rounded-xs px-inline-md',
        'bg-surface-default text-label-md-medium text-text-primary',
        'hover:bg-action-tertiary-hover',
        active && 'bg-action-tertiary-hover',
        selected && 'bg-action-primary-subtle hover:bg-action-primary-subtle',
        disabled && 'cursor-not-allowed text-text-disabled hover:bg-surface-default',
        className
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {selected && <Icon name="check" size="md" className="text-text-brand-default" />}
    </li>
  );
});

export interface SelectCategoryProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  title: ReactNode;
}

/** 카테고리 제목 + 하위 옵션 그룹 */
export function SelectCategory({ title, className, children, ...props }: SelectCategoryProps) {
  return (
    <li role="group" aria-label={typeof title === 'string' ? title : undefined} className={cn('px-inline-sm py-stack-sm', className)} {...props}>
      <div
        role="presentation"
        className="flex items-center gap-gap-sm bg-surface-transparent-white px-inline-md pb-stack-sm pt-stack-md text-label-xs-bold text-text-tertiary"
      >
        {title}
      </div>
      <ul role="presentation" className="flex flex-col">
        {children}
      </ul>
    </li>
  );
}
