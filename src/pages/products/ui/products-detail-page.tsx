import InquireCard from '@/widgets/products/ui/inquire-card';
import ProductDetail from '@/widgets/products/ui/product-detail';
import ProductsReview from '@/widgets/products/ui/products-review';

export default function ProductsDetailPage() {
  return (
    <div className="mt-10">
      <div className="h-72 w-full bg-gray-200" />
      <div className="mt-6.5 grid grid-cols-[1fr_3.5fr] gap-10 px-4 sm:px-8 md:px-16 lg:px-32 2xl:px-[300px]">
        <InquireCard />
        <div className="flex flex-col gap-10">
          <ProductDetail />
          {/* TODO: 컴포넌트 3: 차트 */}

          <ProductsReview />
        </div>
      </div>
    </div>
  );
}
