import VendorBoard from '@/widgets/vendorHome/ui/vendor-board';
import VendorChatWidget from '@/widgets/vendorHome/ui/vendor-chat-widget';
import VendorNoticeWidget from '@/widgets/vendorHome/ui/vendor-notice-widget';

export default function VendorHomePage() {
  return (
    <div className="flex max-h-[567px] w-full flex-col pr-8">
      {/* 상단 */}
      <div className="grid grid-cols-[2.5fr_1fr_1fr] gap-5.5 2xl:grid-cols-[1.7fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <VendorBoard />
          <div className="h-[349px] rounded-2xl border-2 border-[#404040] px-[22.5px] py-5">
            <h2 className="text-xl font-semibold text-white">매출 통계</h2>
          </div>
        </div>
        <VendorChatWidget />
        <VendorNoticeWidget />
      </div>
      {/* 하단 */}
    </div>
  );
}
