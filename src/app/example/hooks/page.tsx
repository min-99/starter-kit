import type { Metadata } from 'next';
import HooksExample from './_components/HooksExample';

export const metadata: Metadata = { title: '커스텀 훅 예제' };

export default function HooksPage() {
  return <HooksExample />;
}
