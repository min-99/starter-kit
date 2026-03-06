import styles from './Loading.module.css';

type LoadingSize = 'sm' | 'md' | 'lg';

interface LoadingProps {
  size?: LoadingSize;
  label?: string;
  fullScreen?: boolean;
}

export default function Loading({
  size = 'md',
  label = '로딩 중...',
  fullScreen = false,
}: LoadingProps) {
  return (
    <div
      aria-label={label}
      aria-live="polite"
      className={[styles.container, fullScreen ? styles.fullScreen : ''].filter(Boolean).join(' ')}
      role="status"
    >
      <span className={[styles.spinner, styles[size]].join(' ')} />
      <span className="sr-only">{label}</span>
    </div>
  );
}
