import PeriodSection from '@/widgets/my/ui/period-section';
import ItemDetailSection from '@/widgets/my/ui/item-detail-section';

function MyDetail() {
  return (
    <section>
      <h1 className="mb-3 text-2xl font-bold">상세 정보</h1>
      <PeriodSection />
      <ItemDetailSection />
    </section>
  );
}

export default MyDetail;
