'use client';

import ChatMetaProvider from '@/shared/model/ChatMetaProvider';
import { notFound, useSearchParams } from 'next/navigation';

function ChattingMainWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const consumerId = searchParams?.get('consumerId');
  const vendorId = searchParams?.get('vendorId');

  if (!consumerId || !vendorId) {
    notFound();
  }

  return (
    <ChatMetaProvider
      initialValues={{
        consumerId,
        consumerName: 'userA',
        vendorId,
        vendorName: 'vendorA',
      }}
    >
      {children}
    </ChatMetaProvider>
  );
}
export default ChattingMainWrapper;
