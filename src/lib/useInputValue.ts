import { useRef, useState, type ChangeEvent } from 'react';

type El = HTMLInputElement | HTMLTextAreaElement;

/**
 * 제어/비제어 입력을 모두 지원하면서 현재 값(길이, 비어있는지)을 추적합니다.
 * clear() 는 비제어일 때 직접 값을 비우고, 제어일 때는 onClear 로 부모에게 맡깁니다.
 */
export function useInputValue<T extends El>(opts: {
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: (e: ChangeEvent<T>) => void;
  onClear?: () => void;
}) {
  const ref = useRef<T>(null);
  const isControlled = opts.value !== undefined;
  const [inner, setInner] = useState(String(opts.defaultValue ?? ''));
  const current = isControlled ? String(opts.value ?? '') : inner;

  const onChange = (e: ChangeEvent<T>) => {
    if (!isControlled) setInner(e.target.value);
    opts.onChange?.(e);
  };

  const clear = () => {
    if (!isControlled && ref.current) {
      ref.current.value = '';
      setInner('');
    }
    opts.onClear?.();
    ref.current?.focus();
  };

  return { ref, value: current, onChange, clear };
}
