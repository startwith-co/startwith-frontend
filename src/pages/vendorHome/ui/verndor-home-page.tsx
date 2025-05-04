import VendorBoard from '@/entities/vendorHome/ui/vendor-board';

export default function VendorHomePage() {
  return (
    <div className="flex max-h-[567px] w-full flex-col pr-8">
      {/* 상단 */}
      <div className="grid grid-cols-[1.7fr_1fr_1fr] gap-5.5">
        <div className="flex flex-col gap-5">
          <VendorBoard />
          <div className="h-[349px] rounded-2xl border-2 px-[22.5px] py-5">
            <h2 className="text-xl font-semibold text-white">매출 통계</h2>
          </div>
        </div>
        <div className="rounded-2xl border-2">
          <h2>실시간 상담 현황</h2>
        </div>
        <div className="rounded-2xl border-2">
          <h2>공지 사항</h2>
        </div>
      </div>
      {/* 하단 */}
    </div>
  );
}
