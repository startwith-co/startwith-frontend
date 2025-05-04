import InquireCard from '@/widgets/products/ui/inquire-card';
import ProductDetail from '@/widgets/products/ui/product-detail';
import ProductChart from '@/widgets/products/ui/product-chart';
import ProductsReview from '@/widgets/products/ui/product-review';

export default function ProductsDetailPage() {
  return (
    <div className="mt-10 mb-72">
      <div className="h-72 w-full bg-gray-200" />
      <div className="mt-6.5 grid grid-cols-[1fr_3.5fr] gap-10 px-4 sm:px-8 md:px-16 lg:px-32 2xl:px-[300px]">
        <InquireCard />
        <div className="flex flex-col gap-10">
          <ProductDetail />
          <ProductChart />
          <ProductsReview />
        </div>
      </div>
    </div>
  );
}
