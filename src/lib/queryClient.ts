import { QueryClient } from '@tanstack/react-query';

/**
 * 서버 컴포넌트에서 prefetch 시 사용할 QueryClient 팩토리 함수
 * providers.tsx의 클라이언트 QueryClient와 설정을 동일하게 유지
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000 * 60 * 5,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
