import VendorCalculatePage from '@/views/vendorCalculate/ui/vendor-calculate-page';
import { auth } from '@/auth';
import getBoardCount from '@/widgets/vendorHome/api/getBoardCount';

export default async function Page() {
  const session = await auth();
  const boardCount = await getBoardCount(session?.vendorSeq || 0);
  return <VendorCalculatePage boardCount={boardCount.data} />;
}
