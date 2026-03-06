import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './ExampleLayout.module.css';

interface ExampleLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ExampleLayout({ title, description, children }: ExampleLayoutProps) {
  return (
    <main className={styles.main}>
      <div className="container">
        <Link className={styles.back} href="/example">
          ← 예제 목록
        </Link>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {children}
      </div>
    </main>
  );
}
