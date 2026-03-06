import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
            {props.required && (
              <span aria-hidden="true" className={styles.required}>
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          className={[styles.input, error ? styles.inputError : '', className]
            .filter(Boolean)
            .join(' ')}
          id={inputId}
          {...props}
        />
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        {hint && !error && <p className={styles.hint}>{hint}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
