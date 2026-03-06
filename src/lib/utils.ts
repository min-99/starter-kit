/**
 * 클래스명 조합 유틸리티
 * CSS Modules와 조건부 클래스를 깔끔하게 합칩니다
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * 날짜를 한국어 형식으로 포맷
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(dateObj);
}

/**
 * 숫자를 한국어 통화 형식으로 포맷
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
}

/**
 * 숫자에 천 단위 구분자 추가
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}

/**
 * 문자열을 지정한 길이로 자르고 말줄임 처리
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

/**
 * 딜레이 유틸리티 (개발/테스트용)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 에러를 안전하게 Error 객체로 변환
 */
export function toError(error: unknown): Error {
  if (error instanceof Error) return error;
  return new Error(String(error));
}
