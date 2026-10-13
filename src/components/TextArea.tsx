import { forwardRef, useId, useImperativeHandle, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { useInputValue } from '../lib/useInputValue';
import { Field, fieldBox, fieldText } from './Field';

/**
 * Figma: Inputs/TextArea
 *   State  = Default | Focus | Disabled
 *   Status = Empty | Filled
 *   Show Label, Show helpText, Show num → label, helpText, showCount
 */
export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  helpText?: ReactNode;
  /** 글자 수 표시 (Figma: Show num). maxLength 가 있으면 "n/최대" 형태 */
  showCount?: boolean;
  className?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, helpText, showCount = true, disabled, className, id, value, defaultValue, onChange, maxLength, ...props },
  forwardedRef
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const field = useInputValue<HTMLTextAreaElement>({ value, defaultValue, onChange });
  useImperativeHandle(forwardedRef, () => field.ref.current!);

  return (
    <Field id={inputId} label={label} helpText={helpText} disabled={disabled} className={className}>
      <div
        className={cn(
          fieldBox,
          'flex-col items-stretch gap-gap-sm px-inline-md py-stack-sm rounded-sm',
          !disabled && 'focus-within:border-border-input-focus'
        )}
      >
        <textarea
          ref={field.ref}
          id={inputId}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={field.onChange}
          maxLength={maxLength}
          aria-describedby={helpText != null ? `${inputId}-help` : undefined}
          className={cn(fieldText, 'min-h-80 max-h-120 resize-none')}
          {...props}
        />
        {showCount && (
          <p className="flex justify-end text-caption" aria-live="polite">
            <span className={disabled ? 'text-text-disabled' : 'text-text-primary'}>{field.value.length}</span>
            {maxLength != null && <span className="text-text-disabled">/{maxLength}</span>}
          </p>
        )}
      </div>
    </Field>
  );
});
