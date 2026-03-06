/**
 * API 베이스 URL - 환경 변수로 관리
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

/**
 * API 응답 에러 클래스
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * 공통 fetch 래퍼
 * - 자동 JSON 파싱
 * - 에러 처리
 * - 타입 안전성 보장
 */
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let message = `HTTP Error: ${response.status}`;
    try {
      const errorData = (await response.json()) as { message?: string };
      if (errorData.message) message = errorData.message;
    } catch {
      /* 에러 응답이 JSON이 아닌 경우 기본 메시지 사용 */
    }
    throw new ApiError(response.status, message);
  }

  /* 204 No Content 처리 */
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

/**
 * HTTP 메서드별 래퍼 함수
 */
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    }),

  put: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi<T>(endpoint, { method: 'DELETE', ...options }),
};
