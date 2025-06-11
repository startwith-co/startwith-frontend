import { auth } from '@/auth';
import VendorMyProfile from '@/pages/vendorMy/ui/vendor-my-profile-page';
import { SessionProvider } from 'next-auth/react';
import getVendorInfo from '@/pages/vendorMy/api/getVendorInfo';

export const dynamic = 'force-dynamic';

export default async function page() {
  const session = await auth();
  const vendorInfo = await getVendorInfo(session?.vendorSeq || 0);
  return (
    <SessionProvider>
      <VendorMyProfile vendorInfo={vendorInfo} />
    </SessionProvider>
  );
}
