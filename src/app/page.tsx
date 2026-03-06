import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '홈',
};

const TECH_STACK = [
  'Next.js 15',
  'React 19',
  'TypeScript',
  'React Query',
  'Vanilla CSS',
  'ESLint',
  'Prettier',
];

const EXAMPLES = [
  {
    href: '/example/fetch',
    title: '데이터 패칭',
    description: 'useQuery · useMutation으로 CRUD 구현',
  },
  {
    href: '/example/form',
    title: '폼 & 유효성 검사',
    description: '제어 컴포넌트 + 실시간 검증 + 비밀번호 강도',
  },
  {
    href: '/example/hooks',
    title: '커스텀 훅',
    description: 'useDebounce 검색 최적화 · useLocalStorage 영속 저장',
  },
  {
    href: '/example/components',
    title: 'UI 컴포넌트',
    description: 'Button · Input · Loading · ErrorMessage 쇼케이스',
  },
];

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Next.js 15 Starter Kit</h1>
        <p className={styles.description}>빠른 웹 애플리케이션 개발을 위한 프로토타입 스타터 킷</p>
        <div className={styles.stack}>
          {TECH_STACK.map((tech) => (
            <span key={tech} className={styles.badge}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.examples}>
        <h2 className={styles.examplesTitle}>예제 살펴보기</h2>
        <ul className={styles.grid}>
          {EXAMPLES.map((ex) => (
            <li key={ex.href}>
              <Link className={styles.card} href={ex.href}>
                <span className={styles.cardTitle}>{ex.title}</span>
                <span className={styles.cardDescription}>{ex.description}</span>
                <span className={styles.cardArrow}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
