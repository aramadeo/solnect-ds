import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Field, fieldBox } from './Field';
import { Icon } from './Icon';
import { SelectCategory, SelectOption, SelectOptions } from './SelectOptions';

/**
 * Figma: Inputs/Select
 *   Size   = Medium | Large
 *   State  = Default | Hover | Pressed(열림) | Disabled
 *   Status = Empty | Filled → value 유무
 *   Show Label → label (없으면 숨김)
 */
export type SelectSize = 'medium' | 'large';

export interface SelectItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectGroup {
  category: ReactNode;
  options: SelectItem[];
}

export interface SelectProps {
  /** 옵션 목록. SelectGroup 배열을 넘기면 카테고리형(Select Options type=category)으로 표시 */
  options: SelectItem[] | SelectGroup[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: ReactNode;
  label?: ReactNode;
  size?: SelectSize;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

const sizeClass: Record<SelectSize, string> = {
  medium: 'h-control-md rounded-xs',
  large: 'h-control-lg rounded-sm',
};

const isGrouped = (o: SelectItem[] | SelectGroup[]): o is SelectGroup[] => o.length > 0 && 'options' in o[0];

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = '선택',
  label,
  size = 'medium',
  disabled,
  id,
  name,
  className,
}: SelectProps) {
  const autoId = useId();
  const triggerId = id ?? autoId;
  const listId = `${triggerId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);

  const [inner, setInner] = useState(defaultValue);
  const selected = value !== undefined ? value : inner;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const flat = useMemo(() => (isGrouped(options) ? options.flatMap((g) => g.options) : options), [options]);
  const selectedItem = flat.find((o) => o.value === selected);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const openList = () => {
    setActiveIndex(Math.max(0, flat.findIndex((o) => o.value === selected)));
    setOpen(true);
  };

  const choose = (item: SelectItem) => {
    if (item.disabled) return;
    if (value === undefined) setInner(item.value);
    onChange?.(item.value);
    setOpen(false);
  };

  const move = (dir: 1 | -1) => {
    if (!flat.length) return;
    let i = activeIndex;
    for (let n = 0; n < flat.length; n++) {
      i = (i + dir + flat.length) % flat.length;
      if (!flat[i].disabled) break;
    }
    setActiveIndex(i);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      move(e.key === 'ArrowDown' ? 1 : -1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (flat[activeIndex]) choose(flat[activeIndex]);
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false);
    }
  };

  const renderOption = (item: SelectItem) => {
    const index = flat.indexOf(item);
    return (
      <SelectOption
        key={item.value}
        id={`${listId}-${index}`}
        selected={item.value === selected}
        active={open && index === activeIndex}
        disabled={item.disabled}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => choose(item)}
        onMouseEnter={() => setActiveIndex(index)}
      >
        {item.label}
      </SelectOption>
    );
  };

  return (
    <Field id={triggerId} label={label} disabled={disabled} className={cn('relative', className)}>
      <div ref={rootRef} className="relative">
        <button
          id={triggerId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          disabled={disabled}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
          className={cn(
            fieldBox,
            'gap-gap-sm px-inline-md py-stack-xs text-left',
            'disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-surface-subtlest',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand-default focus-visible:ring-offset-2',
            sizeClass[size],
            !disabled && (open ? 'border-border-tertiary-hover' : 'hover:border-border-tertiary-default')
          )}
        >
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-body-md-regular',
              selectedItem && !disabled ? 'text-text-primary' : 'text-text-disabled'
            )}
          >
            {selectedItem ? selectedItem.label : placeholder}
          </span>
          <Icon name="chevron-down" size="sm" className={disabled ? 'text-icon-disabled' : 'text-icon-secondary'} />
        </button>
        {name && <input type="hidden" name={name} value={selected ?? ''} />}

        {open && (
          <SelectOptions id={listId} aria-labelledby={triggerId} className="absolute left-0 right-0 top-full z-10 mt-4 max-h-320">
            {isGrouped(options)
              ? options.map((group, i) => (
                  <SelectCategory key={i} title={group.category}>
                    {group.options.map(renderOption)}
                  </SelectCategory>
                ))
              : options.map(renderOption)}
          </SelectOptions>
        )}
      </div>
    </Field>
  );
}
