import InquireCard from '@/widgets/products/ui/inquire-card';
import ProductChart from '@/widgets/products/ui/product-chart';
import ProductDetail from '@/widgets/products/ui/product-detail';

export default function ProductsDetailPage() {
  return (
    <div className="mt-10 mb-72">
      <div className="h-72 w-full bg-gray-200" />
      <div className="mt-6.5 grid grid-cols-[1fr_3.5fr] gap-10 px-20 2xl:px-72">
        <InquireCard />
        <div className="flex min-w-0 flex-col gap-10">
          <ProductDetail />
          <ProductChart />
        </div>
      </div>
    </div>
  );
}
