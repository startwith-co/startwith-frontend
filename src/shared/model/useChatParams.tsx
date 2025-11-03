'use client';

import { useSearchParams } from 'next/navigation';

function useChatParams() {
  const searchParams = useSearchParams();
  const consumerSeq = searchParams.get('consumerId') as string;
  const vendorSeq = searchParams.get('vendorId') as string;

  return {
    consumerSeq,
    vendorSeq,
  };
}

export default useChatParams;
