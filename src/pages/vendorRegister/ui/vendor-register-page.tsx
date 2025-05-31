import DarkButton from '@/entities/vendorRegister/ui/dark-button';
import { Button } from '@/shared/ui/button';
import VendorDetailInfo from '@/widgets/vendorRegister/ui/vendor-detail-info';
import VendorKeyword from '@/widgets/vendorRegister/ui/vendor-keyword';
import VendorNormalInfo from '@/widgets/vendorRegister/ui/vendor-normal-info';
import VendorSaleInfo from '@/widgets/vendorRegister/ui/vendor-sale-info';

export default function VendorRegisterPage() {
  return (
    <div className="flex w-full flex-col gap-7.5 pr-10">
      <VendorNormalInfo />
      <VendorSaleInfo />
      <VendorDetailInfo />
      <VendorKeyword />
      <div className="mt-7.5 flex items-center justify-center gap-3.5 font-semibold text-white">
        <Button
          asChild={false}
          className="bg-vendor-gray text-black hover:text-white"
        >
          취소
        </Button>
        <Button asChild={false}>등록하기</Button>
      </div>
    </div>
  );
}
