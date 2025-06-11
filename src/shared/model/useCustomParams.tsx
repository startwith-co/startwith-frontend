'use client';

import { useParams } from 'next/navigation';

function useCustomParams() {
  const params = useParams();
  if (!params) throw new Error('No params found');
  const userId = params.id as string;
  return userId;
}

export default useCustomParams;
