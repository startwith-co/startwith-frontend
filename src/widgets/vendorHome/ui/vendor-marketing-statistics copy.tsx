import VendorLineChart from '@/entities/vendorHome/ui/vendor-line-chart';
import DarkBox from '@/shared/ui/dark-box';

export default function VendorMarketingStatistics() {
  return (
    <div className="h-[349px] rounded-2xl bg-white px-[22.5px] py-5 shadow-md">
      <h2 className="mb-2 text-base font-semibold sm:mb-3 sm:text-lg md:mb-4 md:text-xl">
        마케팅 통계
      </h2>
      <div className="grid h-[260px] w-full grid-cols-[3fr_1fr] gap-4">
        <VendorLineChart title="벤더 상세페이지 클릭수" />
        <div className="flex flex-col justify-between">
          <DarkBox className="flex w-full flex-col items-center justify-between px-4 py-3">
            <span className="text-vendor-secondary text-xs">Today 노출수</span>
            <span className="text-xl font-semibold">-</span>
          </DarkBox>
          <DarkBox className="flex w-full flex-col items-center justify-between px-4 py-3">
            <span className="text-vendor-secondary text-xs">CTR</span>
            <span className="text-xl font-semibold">-</span>
          </DarkBox>
          <DarkBox className="flex w-full flex-col items-center justify-between px-4 py-3">
            <span className="text-vendor-secondary text-[11px]">
              상세페이지 평균 체류시간
            </span>
            <span className="text-xl font-semibold">-</span>
          </DarkBox>
        </div>
      </div>
    </div>
  );
}
