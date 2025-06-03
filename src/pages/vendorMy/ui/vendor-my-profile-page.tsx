import EditVendorInfo from '@/features/vendorMy/ui/edit-vendor-info';
import Image from 'next/image';
import EditVendorTextArea from '@/features/vendorMy/ui/edit-vendor-text-area';
import VendorTimeSetting from '@/widgets/vendorMy/ui/vendor-time-setting';
import VendorUploadBanner from '@/widgets/vendorMy/ui/vendor-upload-banner';
import VendorTotalSetting from '@/widgets/vendorMy/ui/vendor-total-setting';
import VendorUploadLogo from '@/widgets/vendorMy/ui/vendor-upload-logo';
import VendorCustomerOverview from '@/widgets/vendorMy/ui/vendor-customer-overview';

function VendorMyProfile() {
  return (
    <section className="flex flex-col gap-7.5 pr-10">
      <div className="grid grid-cols-2 gap-7.5">
        <div className="relative rounded-xl bg-white p-8 shadow-md">
          <Image
            src="/images/profileAdd.png"
            alt="image"
            width={100}
            height={100}
            className="mb-7"
          />
          <Image
            src="/images/add.png"
            alt="image"
            width={20}
            height={20}
            className="absolute top-27 left-25 z-10"
          />
          <EditVendorInfo />
        </div>
        <EditVendorTextArea />
      </div>
      <div className="grid grid-cols-[1fr_2fr] gap-7.5">
        <VendorTimeSetting />
        <VendorUploadBanner />
        <VendorTotalSetting />
        <VendorUploadLogo />
      </div>
      <VendorCustomerOverview />
    </section>
  );
}

export default VendorMyProfile;
