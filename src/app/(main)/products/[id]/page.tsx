import ProductsDetailPage from '@/pages/products/ui/products-detail-page';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await searchParams;
  const { id } = await params;

  return <ProductsDetailPage vendorSeq={id} category={category as string} />;
}
