import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

/** Inputs 계열 공통 레이아웃: formLabel / 필드 / helpText (gap = spacing/gap/xs) */
export interface FieldProps {
  id: string;
  label?: ReactNode;
  helpText?: ReactNode;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function Field({ id, label, helpText, disabled, className, children }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-gap-xs', className)}>
      {label != null && (
        <label
          htmlFor={id}
          className={cn('self-start text-label-md-medium', disabled ? 'text-text-disabled' : 'text-text-primary')}
        >
          {label}
        </label>
      )}
      {children}
      {helpText != null && (
        <p id={`${id}-help`} className={cn('text-caption', disabled ? 'text-text-disabled' : 'text-text-tertiary')}>
          {helpText}
        </p>
      )}
    </div>
  );
}

/** 입력 필드 박스 공통 스타일 (textField) */
export const fieldBox = [
  'flex w-full items-center border bg-surface-default transition-colors',
  'border-border-input-default',
  'has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-surface-subtlest has-[:disabled]:border-border-disabled',
];

/** 네이티브 input/textarea 공통 스타일 */
export const fieldText =
  'min-w-0 flex-1 bg-transparent text-body-md-regular text-text-primary outline-none placeholder:text-text-disabled disabled:cursor-not-allowed disabled:text-text-disabled';
