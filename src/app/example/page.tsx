import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '예제',
};

const EXAMPLES = [
  {
    href: '/example/fetch',
    title: '데이터 패칭',
    description: 'React Query를 사용한 GET / POST / PUT / DELETE 전체 CRUD 예제',
    tags: ['React Query', 'useQuery', 'useMutation'],
  },
  {
    href: '/example/form',
    title: '폼 & 유효성 검사',
    description: '제어 컴포넌트 방식의 폼 구현과 실시간 유효성 검사 예제',
    tags: ['Form', 'Validation', 'Controlled'],
  },
  {
    href: '/example/hooks',
    title: '커스텀 훅',
    description: 'useDebounce로 검색 최적화, useLocalStorage로 브라우저 저장소 관리',
    tags: ['useDebounce', 'useLocalStorage', 'Custom Hook'],
  },
  {
    href: '/example/components',
    title: 'UI 컴포넌트',
    description: 'Button, Input, Loading, ErrorMessage 등 공통 컴포넌트 쇼케이스',
    tags: ['Button', 'Input', 'Loading'],
  },
];

export default function ExampleIndexPage() {
  return (
    <main className={styles.main}>
      <div className="container">
        <h1 className={styles.title}>예제 모음</h1>
        <p className={styles.description}>스타터 킷에 포함된 패턴과 컴포넌트를 확인하세요.</p>
        <ul className={styles.grid}>
          {EXAMPLES.map((example) => (
            <li key={example.href}>
              <Link className={styles.card} href={example.href}>
                <h2 className={styles.cardTitle}>{example.title}</h2>
                <p className={styles.cardDescription}>{example.description}</p>
                <div className={styles.tags}>
                  {example.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
