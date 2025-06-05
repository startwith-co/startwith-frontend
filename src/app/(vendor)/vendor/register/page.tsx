import VendorRegisterPage from '@/pages/vendorRegister/ui/vendor-register-page';
import { SessionProvider } from 'next-auth/react';

export default function Page() {
  return (
    <SessionProvider>
      <VendorRegisterPage />
    </SessionProvider>
  );
}
