import VendorCalculatePage from '@/views/vendorCalculate/ui/vendor-calculate-page';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  return <VendorCalculatePage vendorSeq={session?.vendorSeq || 0} />;
}
