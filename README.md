# Next.js 15 Frontend Starter Kit

빠른 웹 애플리케이션 개발을 위한 프로토타입 스타터 킷입니다.

## 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 15 | 프레임워크 (App Router) |
| React | 19 | UI 라이브러리 |
| TypeScript | 5 | 타입 안전성 |
| React Query | 5 | 서버 상태 관리 |
| Vanilla CSS (CSS Modules) | - | 스타일링 |
| ESLint | 9 | 코드 품질 |
| Prettier | 3 | 코드 포맷팅 |

## 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env.local

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 스크립트

```bash
npm run dev          # 개발 서버 실행 (Turbopack)
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 검사
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 포맷팅
npm run format:check # Prettier 포맷 확인
npm run type-check   # TypeScript 타입 검사
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈 페이지
│   ├── globals.css         # 전역 CSS (변수, 리셋, 유틸리티)
│   ├── providers.tsx       # 클라이언트 프로바이더 (React Query)
│   └── example/            # 예제 라우트
│       ├── page.tsx
│       └── _components/    # 라우트 전용 컴포넌트
├── components/
│   ├── ui/                 # 공통 UI 컴포넌트
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Loading/
│   │   └── ErrorMessage/
│   └── layout/             # 레이아웃 컴포넌트
│       └── Header/
├── hooks/                  # 커스텀 훅
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
├── lib/                    # 유틸리티 및 설정
│   ├── queryClient.ts      # React Query 클라이언트 팩토리
│   └── utils.ts            # 공통 유틸리티 함수
├── services/
│   └── api.ts              # API 클라이언트 (fetch 래퍼)
└── types/
    └── index.ts            # 공통 타입 정의
```

## CSS 시스템

`globals.css`에 CSS 변수(디자인 토큰)가 정의되어 있습니다.

```css
/* 색상 */
var(--color-primary)
var(--color-text-primary)
var(--color-bg-secondary)

/* 간격 */
var(--spacing-sm)    /* 8px */
var(--spacing-md)    /* 16px */
var(--spacing-lg)    /* 24px */

/* 폰트 */
var(--font-size-md)
var(--font-weight-semibold)
```

컴포넌트 스타일은 CSS Modules(`.module.css`)로 작성합니다.

## API 사용 예시

```ts
// src/services/posts.ts
import { api } from '@/services/api';
import type { Post } from '@/types';

export const postsApi = {
  getAll: () => api.get<Post[]>('/posts'),
  getOne: (id: number) => api.get<Post>(`/posts/${id}`),
  create: (data: Omit<Post, 'id'>) => api.post<Post>('/posts', data),
};
```

```tsx
// 컴포넌트에서 사용
import { useQuery } from '@tanstack/react-query';
import { postsApi } from '@/services/posts';

const { data, isLoading, isError } = useQuery({
  queryKey: ['posts'],
  queryFn: postsApi.getAll,
});
```

## 환경 변수

| 변수명 | 설명 |
|--------|------|
| `NEXT_PUBLIC_API_URL` | API 서버 URL |
# 클로드 코드를 활용한 starter-kit
