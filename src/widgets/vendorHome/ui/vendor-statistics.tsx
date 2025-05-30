import VendorLineChart from '@/entities/vendorHome/ui/vendor-line-chart';
import DarkBox from '@/shared/ui/dark-box';

export default function VendorStatistics() {
  return (
    <div className="h-[349px] rounded-2xl bg-white px-[22.5px] py-5 shadow-md">
      <h2 className="mb-2 text-base font-semibold sm:mb-3 sm:text-lg md:mb-4 md:text-xl">
        매출 통계
      </h2>
      <div className="grid h-[260px] w-full grid-cols-[3fr_1fr] gap-4">
        <VendorLineChart />
        <div className="flex flex-col justify-between">
          <DarkBox className="flex w-full flex-col items-center justify-between px-4 py-3">
            <span className="text-vendor-secondary text-xs">Today 매출</span>
            <span className="text-xl font-semibold">100,000원</span>
          </DarkBox>
          <DarkBox className="flex w-full flex-col items-center justify-between px-4 py-3">
            <span className="text-vendor-secondary text-xs">견적 요청율</span>
            <span className="text-xl font-semibold">25%</span>
          </DarkBox>
          <DarkBox className="flex w-full flex-col items-center justify-between px-4 py-3">
            <span className="text-vendor-secondary text-xs">거래 성사율</span>
            <span className="text-xl font-semibold">60%</span>
          </DarkBox>
        </div>
      </div>
    </div>
  );
}
