import type { Metadata } from 'next';
import FormExample from './_components/FormExample';

export const metadata: Metadata = { title: '폼 & 유효성 검사 예제' };

export default function FormPage() {
  return <FormExample />;
}
