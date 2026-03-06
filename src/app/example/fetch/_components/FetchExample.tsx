'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ExampleLayout from '../../_components/ExampleLayout';
import styles from './FetchExample.module.css';

/* ===========================
   타입 정의
   =========================== */
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

type CreatePostInput = Omit<Post, 'id'>;

/* ===========================
   API 함수
   JSONPlaceholder는 실제로 변경되지 않지만 응답은 정상적으로 옵니다.
   =========================== */
const BASE = 'https://jsonplaceholder.typicode.com';

const postsApi = {
  getList: async (): Promise<Post[]> => {
    const res = await fetch(`${BASE}/posts?_limit=5`);
    return res.json() as Promise<Post[]>;
  },
  getOne: async (id: number): Promise<Post> => {
    const res = await fetch(`${BASE}/posts/${id}`);
    return res.json() as Promise<Post>;
  },
  create: async (data: CreatePostInput): Promise<Post> => {
    const res = await fetch(`${BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json() as Promise<Post>;
  },
  update: async ({ id, ...data }: Post): Promise<Post> => {
    const res = await fetch(`${BASE}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json() as Promise<Post>;
  },
  delete: async (id: number): Promise<void> => {
    await fetch(`${BASE}/posts/${id}`, { method: 'DELETE' });
  },
};

/* ===========================
   메인 컴포넌트
   =========================== */
export default function FetchExample() {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) =>
    setLog((prev) => [`[${new Date().toLocaleTimeString('ko-KR')}] ${msg}`, ...prev.slice(0, 9)]);

  /* ── GET 목록 ── */
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getList,
  });

  /* ── GET 단건 ── */
  const { data: detail, isFetching: isDetailFetching } = useQuery({
    queryKey: ['posts', selectedId],
    queryFn: () => postsApi.getOne(selectedId!),
    enabled: selectedId !== null,
  });

  /* ── POST ── */
  const createMutation = useMutation({
    mutationFn: postsApi.create,
    onSuccess: (data) => {
      addLog(`POST 성공 → 생성된 ID: ${data.id}, 제목: "${data.title}"`);
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  /* ── PUT ── */
  const updateMutation = useMutation({
    mutationFn: postsApi.update,
    onSuccess: (data) => {
      addLog(`PUT 성공 → ID: ${data.id} 업데이트 완료`);
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  /* ── DELETE ── */
  const deleteMutation = useMutation({
    mutationFn: postsApi.delete,
    onSuccess: (_, id) => {
      addLog(`DELETE 성공 → ID: ${id} 삭제 완료`);
      if (selectedId === id) setSelectedId(null);
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleCreate = () => {
    createMutation.mutate({ title: '새 게시글', body: '새로 생성된 게시글 내용', userId: 1 });
  };

  const handleUpdate = (post: Post) => {
    updateMutation.mutate({ ...post, title: `[수정됨] ${post.title}` });
  };

  return (
    <ExampleLayout
      description="useQuery로 데이터를 조회하고 useMutation으로 생성·수정·삭제를 처리합니다."
      title="데이터 패칭 (CRUD)"
    >
      <div className={styles.layout}>
        {/* 목록 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              GET <span className={styles.badge}>/posts</span>
            </h2>
            <button
              className={`${styles.actionBtn} ${styles.postBtn}`}
              disabled={createMutation.isPending}
              onClick={handleCreate}
            >
              {createMutation.isPending ? '생성 중...' : '+ POST 생성'}
            </button>
          </div>

          {isLoading ? (
            <p className={styles.loadingText}>로딩 중...</p>
          ) : (
            <ul className={styles.list}>
              {posts?.map((post) => (
                <li
                  key={post.id}
                  className={`${styles.listItem} ${selectedId === post.id ? styles.selected : ''}`}
                >
                  <button className={styles.itemTitle} onClick={() => setSelectedId(post.id)}>
                    #{post.id} {post.title}
                  </button>
                  <div className={styles.itemActions}>
                    <button
                      className={`${styles.actionBtn} ${styles.putBtn}`}
                      disabled={updateMutation.isPending}
                      onClick={() => handleUpdate(post)}
                    >
                      PUT
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      disabled={deleteMutation.isPending}
                      onClick={() => deleteMutation.mutate(post.id)}
                    >
                      DELETE
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 단건 상세 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            GET <span className={styles.badge}>/posts/:id</span>
          </h2>
          {selectedId === null ? (
            <p className={styles.placeholder}>왼쪽 목록에서 게시글을 클릭하세요</p>
          ) : isDetailFetching ? (
            <p className={styles.loadingText}>불러오는 중...</p>
          ) : detail ? (
            <div className={styles.detail}>
              <p className={styles.detailId}>ID: {detail.id}</p>
              <p className={styles.detailTitle}>{detail.title}</p>
              <p className={styles.detailBody}>{detail.body}</p>
            </div>
          ) : null}
        </section>

        {/* 응답 로그 */}
        <section className={`${styles.section} ${styles.logSection}`}>
          <h2 className={styles.sectionTitle}>응답 로그</h2>
          {log.length === 0 ? (
            <p className={styles.placeholder}>POST / PUT / DELETE 버튼을 눌러보세요</p>
          ) : (
            <ul className={styles.logList}>
              {log.map((entry, i) => (
                <li key={i} className={styles.logEntry}>
                  {entry}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </ExampleLayout>
  );
}
