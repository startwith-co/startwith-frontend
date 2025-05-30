import VendorBoard from '@/widgets/vendorHome/ui/vendor-board';
import VendorChatWidget from '@/widgets/vendorHome/ui/vendor-chat-widget';
import VendorNoticeWidget from '@/widgets/vendorHome/ui/vendor-notice-widget';
import VendorStatistics from '@/widgets/vendorHome/ui/vendor-statistics';
import VendorServiceBoard from '@/widgets/vendorHome/ui/vendor-service-board';

export default function VendorHomePage() {
  return (
    <div className="flex w-full flex-col gap-7.5 pr-8">
      <div className="grid grid-cols-[2.5fr_1fr_1fr] gap-7.5 2xl:grid-cols-[1.7fr_1fr_1fr]">
        <div className="flex flex-col gap-7.5">
          <VendorBoard />
          <VendorStatistics />
        </div>
        <VendorChatWidget />
        <VendorNoticeWidget />
      </div>

      <div className="grid grid-cols-[2.5fr_1fr_1fr] gap-7.5 2xl:grid-cols-[1.7fr_1fr_1fr]">
        <div className="col-start-1 col-end-2">
          <VendorStatistics />
        </div>
        <div className="col-start-2 col-end-4 h-full">
          <VendorServiceBoard />
        </div>
      </div>
    </div>
  );
}
