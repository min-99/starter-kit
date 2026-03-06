import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  title = '오류가 발생했습니다',
  message = '잠시 후 다시 시도해주세요.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className={styles.container} role="alert">
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
}
