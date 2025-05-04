import VendorLineChart from '@/entities/vendorHome/ui/vendor-line-chart';
import DarkBox from '@/shared/ui/dark-box';

export default function VendorStatistics() {
  return (
    <div className="h-[349px] rounded-2xl border-2 border-[#404040] px-[22.5px] py-5">
      <h2 className="mb-2 text-base font-semibold text-white sm:mb-3 sm:text-lg md:mb-4 md:text-xl">
        매출 통계
      </h2>
      <div className="grid h-[260px] w-full grid-cols-[3fr_1fr] gap-4">
        <VendorLineChart />
        <div className="flex flex-col justify-between">
          <DarkBox className="flex w-full flex-col items-center justify-between px-4 py-3">
            <span className="text-xs text-[#AAAAAA]">Today 매출</span>
            <span className="text-xl font-semibold text-white">100,000원</span>
          </DarkBox>
          <DarkBox className="flex w-full flex-col items-center justify-between px-4 py-3">
            <span className="text-xs text-[#AAAAAA]">견적 요청율</span>
            <span className="text-xl font-semibold text-white">25%</span>
          </DarkBox>
          <DarkBox className="flex w-full flex-col items-center justify-between px-4 py-3">
            <span className="text-xs text-[#AAAAAA]">거래 성사율</span>
            <span className="text-xl font-semibold text-white">60%</span>
          </DarkBox>
        </div>
      </div>
    </div>
  );
}
