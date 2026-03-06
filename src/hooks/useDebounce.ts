'use client';

import { useEffect, useState } from 'react';

/**
 * 값 변경을 지정한 시간만큼 지연시키는 훅
 * 검색 인풋 등에서 API 요청 빈도를 줄일 때 사용
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
