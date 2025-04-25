'use client';

import { ReactNode, useEffect, useState } from 'react';

export default function MSWProvider({ children }: { children: ReactNode }) {
  const [isMockingReady, setIsMockingReady] = useState(false);

  useEffect(() => {
    console.log('render');
    async function enableMocking() {
      if (
        typeof window !== 'undefined' &&
        process.env.NODE_ENV === 'development'
      ) {
        const { default: worker } = await import('./mocks/browser');
        await worker.start();
        setIsMockingReady(true); // 모킹 준비 완료
      }
    }

    enableMocking();
  }, []);

  if (!isMockingReady) {
    return <div>로딩 중...</div>; // 모킹 준비가 완료될 때까지 대기
  }

  return <div>{children}</div>; // 모킹 준비 완료 후 자식 컴포넌트 렌더링
}
