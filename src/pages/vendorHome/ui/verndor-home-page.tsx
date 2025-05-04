import VendorBoard from '@/widgets/vendorHome/ui/vendor-board';
import VendorChatWidget from '@/widgets/vendorHome/ui/vendor-chat-widget';
import VendorNoticeWidget from '@/widgets/vendorHome/ui/vendor-notice-widget';
import VendorStatistics from '@/widgets/vendorHome/ui/vendor-statistics';

export default function VendorHomePage() {
  return (
    <div className="flex max-h-[567px] w-full flex-col pr-8">
      {/* 상단 */}
      <div className="grid grid-cols-[2.5fr_1fr_1fr] gap-5.5 2xl:grid-cols-[1.7fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <VendorBoard />
          <VendorStatistics />
        </div>
        <VendorChatWidget />
        <VendorNoticeWidget />
      </div>
      {/* 하단 */}
    </div>
  );
}
