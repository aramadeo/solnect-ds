import { useEffect, useState } from 'react';

/** :root 에 선언된 CSS 변수의 계산값을 읽습니다 (var() 참조는 브라우저가 풀어서 돌려줌). */
export function useCssVars(names: string[]) {
  const [values, setValues] = useState<Record<string, string>>({});
  const key = names.join('|');

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setValues(Object.fromEntries(names.map((n) => [n, style.getPropertyValue(n).trim()])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return values;
}
