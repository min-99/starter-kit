'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';
import Input from '@/components/ui/Input/Input';
import Loading from '@/components/ui/Loading/Loading';
import ExampleLayout from '../../_components/ExampleLayout';
import styles from './ComponentsExample.module.css';

export default function ComponentsExample() {
  return (
    <ExampleLayout
      description="스타터 킷에 포함된 공통 UI 컴포넌트와 사용 예시입니다."
      title="UI 컴포넌트"
    >
      <div className={styles.sections}>
        <ButtonSection />
        <InputSection />
        <LoadingSection />
        <ErrorSection />
      </div>
    </ExampleLayout>
  );
}

/* ===========================
   Button
   =========================== */
function ButtonSection() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const simulateLoading = (id: string) => {
    setLoadingId(id);
    setTimeout(() => setLoadingId(null), 1500);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Button</h2>

      <div className={styles.group}>
        <p className={styles.groupLabel}>variant</p>
        <div className={styles.row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>size</p>
        <div className={styles.row}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>상태</p>
        <div className={styles.row}>
          <Button disabled>Disabled</Button>
          <Button loading={loadingId === 'a'} onClick={() => simulateLoading('a')}>
            {loadingId === 'a' ? '처리 중' : '로딩 시뮬레이션'}
          </Button>
          <Button fullWidth variant="outline">
            Full Width
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ===========================
   Input
   =========================== */
function InputSection() {
  const [value, setValue] = useState('');

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Input</h2>
      <div className={styles.inputGrid}>
        <Input label="기본 입력" placeholder="텍스트를 입력하세요" />
        <Input required label="필수 입력" placeholder="필수 항목" />
        <Input
          hint="8자 이상, 영문+숫자 조합"
          label="힌트 있는 입력"
          placeholder="비밀번호"
          type="password"
        />
        <Input
          error="이미 사용 중인 이메일입니다."
          label="에러 상태"
          type="email"
          value="taken@email.com"
          onChange={() => {}}
        />
        <Input disabled label="비활성화" placeholder="입력 불가" />
        <Input
          label="실시간 반영"
          placeholder="타이핑해보세요..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <div className={styles.inputPreview}>
            입력값: <strong>{value}</strong>
          </div>
        )}
      </div>
    </section>
  );
}

/* ===========================
   Loading
   =========================== */
function LoadingSection() {
  const [fullScreen, setFullScreen] = useState(false);

  const handleFullScreen = () => {
    setFullScreen(true);
    setTimeout(() => setFullScreen(false), 2000);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Loading</h2>

      <div className={styles.group}>
        <p className={styles.groupLabel}>size</p>
        <div className={styles.row}>
          <Loading size="sm" />
          <Loading size="md" />
          <Loading size="lg" />
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>fullScreen</p>
        <Button variant="outline" onClick={handleFullScreen}>
          전체 화면 로딩 (2초)
        </Button>
      </div>

      {fullScreen && <Loading fullScreen label="전체 화면 로딩 중..." />}
    </section>
  );
}

/* ===========================
   ErrorMessage
   =========================== */
function ErrorSection() {
  const [retryCount, setRetryCount] = useState(0);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>ErrorMessage</h2>
      <div className={styles.errorGrid}>
        <div className={styles.errorBox}>
          <p className={styles.groupLabel}>기본</p>
          <ErrorMessage />
        </div>
        <div className={styles.errorBox}>
          <p className={styles.groupLabel}>커스텀 메시지 + 재시도</p>
          <ErrorMessage
            message="서버와 연결할 수 없습니다."
            title="네트워크 오류"
            onRetry={() => setRetryCount((c) => c + 1)}
          />
          {retryCount > 0 && <p className={styles.retryCount}>재시도 횟수: {retryCount}</p>}
        </div>
      </div>
    </section>
  );
}
