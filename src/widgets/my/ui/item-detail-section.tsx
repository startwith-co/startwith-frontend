import DetailItem from '@/entities/my/ui/detail-item';
import DetailControl from '@/features/my/detail-control';
import PaginationControl from '@/features/my/pagination-control';

function ItemDetailSection() {
  return (
    <section className="mb-10 flex w-full flex-col space-y-5 rounded-2xl bg-white p-7 shadow-md">
      <DetailControl />
      <DetailItem
        titleDate="25.01.02"
        status="구매확정"
        statusDate="25.01.02"
        company="기업명"
        solution="솔루션명"
        price="3000원"
      />
      <DetailItem
        titleDate="25.01.02"
        status="구매확정"
        statusDate="25.01.02"
        company="기업명"
        solution="솔루션명"
        price="3000원"
      />{' '}
      <DetailItem
        titleDate="25.01.02"
        status="구매확정"
        statusDate="25.01.02"
        company="기업명"
        solution="솔루션명"
        price="3000원"
      />
      <DetailItem
        titleDate="25.01.02"
        status="구매확정"
        statusDate="25.01.02"
        company="기업명"
        solution="솔루션명"
        price="3000원"
      />
      <DetailItem
        titleDate="25.01.02"
        status="구매확정"
        statusDate="25.01.02"
        company="기업명"
        solution="솔루션명"
        price="3000원"
      />
      <PaginationControl />
    </section>
  );
}

export default ItemDetailSection;
