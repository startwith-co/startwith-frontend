import InquireCard from '@/widgets/products/ui/inquire-card';
import ProductChart from '@/widgets/products/ui/product-chart';
import ProductDetail from '@/widgets/products/ui/product-detail';
import Image from 'next/image';
import getSolution from '../api/getSolution';

export default async function ProductsDetailPage({
  vendorSeq,
  category,
}: {
  vendorSeq: string;
  category: string;
}) {
  const solution = await getSolution(vendorSeq, category);

  return (
    <div className="mt-10 mb-72">
      <Image
        src={solution.representImageUrl}
        alt="image"
        width={100}
        height={100}
        className="h-72 w-full bg-gray-200 object-cover"
      />
      <div className="mt-6.5 grid grid-cols-[1fr_3.5fr] gap-10 px-20 2xl:px-72">
        <InquireCard />
        <div className="flex min-w-0 flex-col gap-10">
          <ProductDetail {...solution} category={category} />
          <ProductChart />
        </div>
      </div>
    </div>
  );
}
