'use client';

import { SessionProvider } from 'next-auth/react';
import TestUserButton from './component/TestUserButton';

function page() {
  return (
    <SessionProvider>
      <TestUserButton />
    </SessionProvider>
  );
}

export default page;
