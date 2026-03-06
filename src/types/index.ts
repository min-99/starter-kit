/**
 * API 공통 응답 타입
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * 페이지네이션 메타 정보
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

/**
 * 페이지네이션 응답 타입
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * 페이지네이션 파라미터
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * 정렬 방향
 */
export type SortDirection = 'asc' | 'desc';

/**
 * 옵션 타입 (select, radio 등 UI 컴포넌트용)
 */
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
