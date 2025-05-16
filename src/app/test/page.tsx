'use client';

import { SessionProvider } from 'next-auth/react';
import TestButton from './component/TestButton';

function page() {
  return (
    <div>
      <SessionProvider>
        <TestButton />
      </SessionProvider>
    </div>
  );
}

export default page;
