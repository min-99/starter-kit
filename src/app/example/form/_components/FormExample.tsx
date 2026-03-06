'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';
import ExampleLayout from '../../_components/ExampleLayout';
import styles from './FormExample.module.css';

/* ===========================
   타입 & 유효성 검사 규칙
   =========================== */
interface SignUpForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: 'user' | 'admin' | '';
  agree: boolean;
}

type FormErrors = Partial<Record<keyof SignUpForm, string>>;

const INITIAL: SignUpForm = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  role: '',
  agree: false,
};

function validate(form: SignUpForm): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = '이름을 입력해주세요.';
  } else if (form.name.trim().length < 2) {
    errors.name = '이름은 2자 이상이어야 합니다.';
  }

  if (!form.email) {
    errors.email = '이메일을 입력해주세요.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!form.password) {
    errors.password = '비밀번호를 입력해주세요.';
  } else if (form.password.length < 8) {
    errors.password = '비밀번호는 8자 이상이어야 합니다.';
  } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(form.password)) {
    errors.password = '영문과 숫자를 모두 포함해야 합니다.';
  }

  if (!form.passwordConfirm) {
    errors.passwordConfirm = '비밀번호 확인을 입력해주세요.';
  } else if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  if (!form.role) {
    errors.role = '역할을 선택해주세요.';
  }

  if (!form.agree) {
    errors.agree = '이용약관에 동의해야 합니다.';
  }

  return errors;
}

/* ===========================
   메인 컴포넌트
   =========================== */
export default function FormExample() {
  const [form, setForm] = useState<SignUpForm>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  /* 한 번이라도 제출을 시도했는지 여부 (제출 전엔 에러 표시 안 함) */
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<SignUpForm | null>(null);

  /* 제출 이후에는 실시간으로 유효성 검사 */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    const nextForm = { ...form, [name]: checked !== undefined ? checked : value };
    setForm(nextForm);
    if (submitted) setErrors(validate(nextForm));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setResult(form);
    setForm(INITIAL);
    setSubmitted(false);
    setErrors({});
  };

  /* 비밀번호 강도 계산 */
  const strength = getPasswordStrength(form.password);

  return (
    <ExampleLayout
      description="제어 컴포넌트 방식으로 폼을 관리하고, 제출 시 및 수정 시 실시간으로 유효성 검사를 수행합니다."
      title="폼 & 유효성 검사"
    >
      <div className={styles.layout}>
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          {/* 이름 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              이름 <span className={styles.required}>*</span>
            </label>
            <input
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              id="name"
              name="name"
              placeholder="홍길동"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          {/* 이메일 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              이메일 <span className={styles.required}>*</span>
            </label>
            <input
              autoComplete="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              id="email"
              name="email"
              placeholder="example@email.com"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          {/* 비밀번호 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              비밀번호 <span className={styles.required}>*</span>
            </label>
            <input
              autoComplete="new-password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              id="password"
              name="password"
              placeholder="영문+숫자 8자 이상"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            {form.password && (
              <div className={styles.strengthBar}>
                <div className={`${styles.strengthFill} ${styles[strength.level]}`} />
                <span className={styles.strengthLabel}>{strength.label}</span>
              </div>
            )}
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="passwordConfirm">
              비밀번호 확인 <span className={styles.required}>*</span>
            </label>
            <input
              autoComplete="new-password"
              className={`${styles.input} ${errors.passwordConfirm ? styles.inputError : ''}`}
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="비밀번호 재입력"
              type="password"
              value={form.passwordConfirm}
              onChange={handleChange}
            />
            {errors.passwordConfirm && <p className={styles.error}>{errors.passwordConfirm}</p>}
          </div>

          {/* 역할 선택 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="role">
              역할 <span className={styles.required}>*</span>
            </label>
            <select
              className={`${styles.select} ${errors.role ? styles.inputError : ''}`}
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="">선택하세요</option>
              <option value="user">일반 사용자</option>
              <option value="admin">관리자</option>
            </select>
            {errors.role && <p className={styles.error}>{errors.role}</p>}
          </div>

          {/* 이용약관 동의 */}
          <div className={styles.checkboxField}>
            <input
              className={styles.checkbox}
              id="agree"
              name="agree"
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
            />
            <label className={styles.checkboxLabel} htmlFor="agree">
              이용약관 및 개인정보 처리방침에 동의합니다.
            </label>
            {errors.agree && (
              <p className={`${styles.error} ${styles.checkboxError}`}>{errors.agree}</p>
            )}
          </div>

          <button className={styles.submitBtn} type="submit">
            회원가입
          </button>
        </form>

        {/* 제출 결과 */}
        <div className={styles.result}>
          <h2 className={styles.resultTitle}>제출 결과</h2>
          {result ? (
            <pre className={styles.resultJson}>
              {JSON.stringify(
                { ...result, password: '••••••••', passwordConfirm: '••••••••' },
                null,
                2,
              )}
            </pre>
          ) : (
            <p className={styles.resultPlaceholder}>폼을 작성하고 제출하면 결과가 표시됩니다.</p>
          )}
        </div>
      </div>
    </ExampleLayout>
  );
}

/* ===========================
   비밀번호 강도 계산
   =========================== */
function getPasswordStrength(password: string): {
  level: 'weak' | 'medium' | 'strong';
  label: string;
} {
  if (password.length === 0) return { level: 'weak', label: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { level: 'weak', label: '약함' };
  if (score <= 3) return { level: 'medium', label: '보통' };
  return { level: 'strong', label: '강함' };
}
