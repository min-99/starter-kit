import type { Metadata } from 'next';
import FetchExample from './_components/FetchExample';

export const metadata: Metadata = { title: '데이터 패칭 예제' };

export default function FetchPage() {
  return <FetchExample />;
}
