import VendorUpdatePage from '@/views/vendorUpdate/ui/vendor-update-page';
import { auth } from '@/auth';
import getUpdateSolution from './api/getUpdateSolution';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { category: string };
}) {
  const { id } = await params;
  const { category } = await searchParams;
  const session = await auth();

  const solution = await getUpdateSolution({ solutionSeq: id });

  return (
    <VendorUpdatePage
      solution={solution}
      vendorId={session?.vendorSeq || 0}
      category={category}
    />
  );
}
