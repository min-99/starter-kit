import { forwardRef, type SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, error, hint, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label} htmlFor={selectId}>
            {label}
            {props.required && (
              <span aria-hidden="true" className={styles.required}>
                *
              </span>
            )}
          </label>
        )}
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            className={[styles.select, error ? styles.selectError : '', className]
              .filter(Boolean)
              .join(' ')}
            id={selectId}
            {...props}
          >
            {placeholder && (
              <option disabled value="">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} disabled={opt.disabled} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span aria-hidden="true" className={styles.icon}>
            ▾
          </span>
        </div>
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

Select.displayName = 'Select';

export default Select;
