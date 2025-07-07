import InquireCard from '@/widgets/products/ui/inquire-card';
import ProductChart from '@/widgets/products/ui/product-chart';
import ProductDetail from '@/widgets/products/ui/product-detail';
import Image from 'next/image';
import VendorInfo from '@/widgets/products/ui/vendor-info';
import getVendorInfo from '@/views/vendorMy/api/getVendorInfo';
import defaultImage from 'public/images/404.png';
import getSolution from '../api/getSolution';
import getVendorCategory from '../api/getVendorCategory';

export default async function ProductsDetailPage({
  vendorSeq,
  category,
}: {
  vendorSeq: string;
  category: string;
}) {
  const [solution, vendorInfo, vendorCategory] = await Promise.all([
    getSolution(vendorSeq, category),
    getVendorInfo(Number(vendorSeq)),
    getVendorCategory(vendorSeq),
  ]);

  return (
    <div className="mt-10 mb-72">
      <Image
        src={vendorInfo.vendorBannerImageUrl || defaultImage}
        alt="image"
        width={200}
        height={170}
        unoptimized
        className="h-72 w-full bg-gray-200 object-cover object-center"
      />
      <div className="mt-6.5 grid grid-cols-[1fr_3.5fr] gap-10 px-20 2xl:px-72">
        <InquireCard
          vendorName={vendorInfo.vendorName || ''}
          vendorId={vendorInfo.vendorUniqueType || ''}
          vendorSeq={Number(vendorSeq)}
          solutionName={solution.solutionName || ''}
        />
        <div className="flex min-w-0 flex-col gap-10">
          <ProductDetail
            {...solution}
            category={category}
            vendorCategory={vendorCategory}
            vendorSeq={vendorSeq}
          />
          <VendorInfo {...vendorInfo} />
          <ProductChart solutionSeq={Number(solution.solutionSeq)} />
        </div>
      </div>
    </div>
  );
}
