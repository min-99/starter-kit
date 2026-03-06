'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ExampleLayout from '../../_components/ExampleLayout';
import styles from './HooksExample.module.css';

/* ===========================
   JSONPlaceholder 유저 타입
   =========================== */
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export default function HooksExample() {
  return (
    <ExampleLayout
      description="useDebounce로 검색 요청을 최적화하고, useLocalStorage로 브라우저에 상태를 영속 저장합니다."
      title="커스텀 훅"
    >
      <div className={styles.sections}>
        <DebounceSection />
        <LocalStorageSection />
      </div>
    </ExampleLayout>
  );
}

/* ===========================
   useDebounce 예제
   =========================== */
function DebounceSection() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  const { data: users, isFetching } = useQuery({
    queryKey: ['users', debouncedQuery],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const all = (await res.json()) as User[];
      if (!debouncedQuery) return all;
      return all.filter(
        (u) =>
          u.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(debouncedQuery.toLowerCase()),
      );
    },
  });

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>useDebounce</h2>
        <p className={styles.cardDescription}>
          입력 중엔 API를 호출하지 않고, 타이핑을 멈춘 후 400ms 뒤에 검색합니다.
        </p>
      </div>

      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          placeholder="이름 또는 이메일로 검색..."
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className={styles.statusBadge} data-fetching={isFetching}>
          {isFetching ? '검색 중...' : `${users?.length ?? 0}명`}
        </span>
      </div>

      <div className={styles.debugRow}>
        <span className={styles.debugLabel}>즉시 값</span>
        <code className={styles.debugValue}>{query || '(없음)'}</code>
        <span className={styles.arrow}>→</span>
        <span className={styles.debugLabel}>디바운스 값 (400ms)</span>
        <code className={styles.debugValue}>{debouncedQuery || '(없음)'}</code>
      </div>

      <ul className={styles.userList}>
        {users?.map((user) => (
          <li key={user.id} className={styles.userItem}>
            <div className={styles.userAvatar}>{user.name[0]}</div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
            <a
              className={styles.userWebsite}
              href={`https://${user.website}`}
              rel="noreferrer"
              target="_blank"
            >
              {user.website}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ===========================
   useLocalStorage 예제
   =========================== */
interface Note {
  id: number;
  text: string;
  createdAt: string;
}

function LocalStorageSection() {
  const [notes, setNotes, clearNotes] = useLocalStorage<Note[]>('example-notes', []);
  const [input, setInput] = useState('');

  const addNote = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setNotes((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, createdAt: new Date().toLocaleTimeString('ko-KR') },
    ]);
    setInput('');
  };

  const removeNote = (id: number) => setNotes((prev) => prev.filter((n) => n.id !== id));

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>useLocalStorage</h2>
        <p className={styles.cardDescription}>
          메모를 추가하고 새로고침해도 데이터가 유지되는 것을 확인하세요.
        </p>
      </div>

      <div className={styles.noteInputRow}>
        <input
          className={styles.searchInput}
          placeholder="메모를 입력하세요..."
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addNote()}
        />
        <button className={styles.addBtn} onClick={addNote}>
          추가
        </button>
      </div>

      {notes.length === 0 ? (
        <p className={styles.emptyText}>저장된 메모가 없습니다. 메모를 추가해보세요!</p>
      ) : (
        <>
          <ul className={styles.noteList}>
            {notes.map((note) => (
              <li key={note.id} className={styles.noteItem}>
                <div>
                  <p className={styles.noteText}>{note.text}</p>
                  <p className={styles.noteTime}>{note.createdAt}</p>
                </div>
                <button
                  aria-label="삭제"
                  className={styles.removeBtn}
                  onClick={() => removeNote(note.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button className={styles.clearBtn} onClick={() => clearNotes()}>
            전체 삭제
          </button>
        </>
      )}

      <p className={styles.storageKey}>
        localStorage key: <code>example-notes</code>
      </p>
    </section>
  );
}
