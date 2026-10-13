import { forwardRef, useId, useImperativeHandle, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { useInputValue } from '../lib/useInputValue';
import { Field, fieldBox, fieldText } from './Field';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

/**
 * Figma: Inputs/Search Input
 *   Size  = Medium
 *   State = Default | Hover | Focus | Complete | Disabled
 *   Show helpText → helpText (없으면 숨김)
 * 일반 Input 과 달리 포커스 테두리는 border/brand/default, 값이 있으면 항상 지우기 버튼 표시.
 */
export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  helpText?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  className?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  {
    helpText,
    clearable = true,
    onClear,
    disabled,
    className,
    id,
    value,
    defaultValue,
    onChange,
    placeholder = '검색어를 입력해 주세요.',
    ...props
  },
  forwardedRef
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const field = useInputValue<HTMLInputElement>({ value, defaultValue, onChange, onClear });
  useImperativeHandle(forwardedRef, () => field.ref.current!);

  return (
    <Field id={inputId} helpText={helpText} disabled={disabled} className={className}>
      <div
        className={cn(
          fieldBox,
          'h-control-md gap-gap-sm px-inline-md rounded-xs',
          !disabled && '[&:not(:focus-within):hover]:border-border-tertiary-hover focus-within:border-border-brand-default'
        )}
      >
        <Icon name="search" size="md" className={disabled ? 'text-icon-disabled' : 'text-icon-primary'} />
        <input
          ref={field.ref}
          id={inputId}
          type="search"
          role="searchbox"
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={field.onChange}
          placeholder={placeholder}
          aria-describedby={helpText != null ? `${inputId}-help` : undefined}
          className={cn(fieldText, '[&::-webkit-search-cancel-button]:appearance-none')}
          {...props}
        />
        {clearable && !disabled && field.value !== '' && (
          <IconButton
            icon="close"
            size="xsmall"
            variant="tertiary"
            radius="circular"
            aria-label="검색어 지우기"
            onMouseDown={(e) => e.preventDefault()}
            onClick={field.clear}
          />
        )}
      </div>
    </Field>
  );
});
