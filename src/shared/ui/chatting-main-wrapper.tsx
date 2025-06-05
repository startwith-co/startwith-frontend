'use client';

import ChatMetaProvider from '@/shared/model/ChatMetaProvider';
import { notFound, useSearchParams } from 'next/navigation';

function ChattingMainWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const userId = searchParams?.get('userId');
  const vendorId = searchParams?.get('vendorId');

  if (!userId || !vendorId) {
    notFound();
  }

  return (
    <ChatMetaProvider
      initialValues={{
        userId,
        userName: 'userA',
        vendorId,
        vendorName: 'vendorC',
      }}
    >
      {children}
    </ChatMetaProvider>
  );
}
export default ChattingMainWrapper;
