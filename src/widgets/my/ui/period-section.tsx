import PeriodCountBox from '@/entities/my/ui/period-countbox';

function PeriodSection() {
  return (
    <div className="mb-5 flex h-[200px] w-full flex-row items-center justify-center space-x-20 rounded-2xl bg-white p-5 shadow-md">
      <PeriodCountBox count={2} title="기간" />
      <PeriodCountBox count={2} title="개발 완료" />
      <PeriodCountBox count={2} title="구매확정" />
      <PeriodCountBox count={2} title="결제취소" />
    </div>
  );
}

export default PeriodSection;
