import { auth } from '@/auth';
import VendorMyProfile from '@/views/vendorMy/ui/vendor-my-profile-page';
import getVendorInfo from '@/views/vendorMy/api/getVendorInfo';

export default async function page() {
  const session = await auth();
  const vendorInfo = await getVendorInfo(session?.vendorSeq || 0);
  return <VendorMyProfile vendorInfo={vendorInfo} />;
}
