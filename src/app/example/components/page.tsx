import type { Metadata } from 'next';
import ComponentsExample from './_components/ComponentsExample';

export const metadata: Metadata = { title: 'UI 컴포넌트 예제' };

export default function ComponentsPage() {
  return <ComponentsExample />;
}
