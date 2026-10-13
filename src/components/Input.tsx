import { forwardRef, useId, useImperativeHandle, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { useInputValue } from '../lib/useInputValue';
import { Field, fieldBox, fieldText } from './Field';
import { IconButton } from './IconButton';

/**
 * Figma: Inputs/Input
 *   Size   = Medium | Large
 *   State  = Default | Hover | Focus | Complete | Disabled → :hover / :focus-within / 값 유무 / disabled
 *   Status = Empty | Filled                                → value 유무
 *   Title, Show Title, Placeholder, Caption, Show helpText → label, placeholder, helpText (없으면 숨김)
 */
export type InputSize = 'medium' | 'large';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  /** 필드 위 라벨 (Figma: Title) */
  label?: ReactNode;
  /** 필드 아래 안내 텍스트 (Figma: Caption) */
  helpText?: ReactNode;
  /** 포커스 상태에서 값이 있으면 지우기 버튼 표시 (Figma: Focus + Filled) */
  clearable?: boolean;
  /** 지우기 버튼 클릭 시 호출. 제어 컴포넌트라면 여기서 value 를 비우세요 */
  onClear?: () => void;
  /** 루트(라벨 + 필드 + 안내문) 클래스 */
  className?: string;
}

const sizeClass: Record<InputSize, string> = {
  medium: 'h-control-md rounded-xs',
  large: 'h-control-lg rounded-sm',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'medium',
    label,
    helpText,
    clearable = true,
    onClear,
    disabled,
    className,
    id,
    value,
    defaultValue,
    onChange,
    ...props
  },
  forwardedRef
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const field = useInputValue<HTMLInputElement>({ value, defaultValue, onChange, onClear });
  useImperativeHandle(forwardedRef, () => field.ref.current!);

  const showClear = clearable && !disabled && field.value !== '';

  return (
    <Field id={inputId} label={label} helpText={helpText} disabled={disabled} className={className}>
      <div
        className={cn(
          fieldBox,
          'group/field gap-gap-sm px-inline-md',
          sizeClass[size],
          !disabled && '[&:not(:focus-within):hover]:border-border-tertiary-hover focus-within:border-border-input-focus'
        )}
      >
        <input
          ref={field.ref}
          id={inputId}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={field.onChange}
          aria-describedby={helpText != null ? `${inputId}-help` : undefined}
          className={fieldText}
          {...props}
        />
        {showClear && (
          <IconButton
            icon="close"
            size="xsmall"
            variant="tertiary"
            radius="circular"
            aria-label="입력 내용 지우기"
            onMouseDown={(e) => e.preventDefault()}
            onClick={field.clear}
            className="hidden group-focus-within/field:inline-flex"
          />
        )}
      </div>
    </Field>
  );
});
