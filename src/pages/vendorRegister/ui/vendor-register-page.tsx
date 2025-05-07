import VendorNormalInfo from '@/widgets/vendorRegister/ui/vendor-normal-info';
import VendorSaleInfo from '@/widgets/vendorRegister/ui/vendor-sale-info';

export default function VendorRegisterPage() {
  return (
    <div className="flex w-full flex-col gap-7.5 pr-5">
      <VendorNormalInfo />
      <VendorSaleInfo />
    </div>
  );
}
