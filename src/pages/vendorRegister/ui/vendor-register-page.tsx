import DarkButton from '@/entities/vendorRegister/ui/dark-button';
import VendorDetailInfo from '@/widgets/vendorRegister/ui/vendor-detail-info';
import VendorNormalInfo from '@/widgets/vendorRegister/ui/vendor-normal-info';
import VendorSaleInfo from '@/widgets/vendorRegister/ui/vendor-sale-info';

export default function VendorRegisterPage() {
  return (
    <div className="flex w-full flex-col gap-7.5 pr-5">
      <VendorNormalInfo />
      <VendorSaleInfo />
      <VendorDetailInfo />
      <div className="mt-7.5 flex items-center justify-center gap-3.5 font-semibold text-white">
        <DarkButton title="취소" />
        <DarkButton title="임시저장" />
        <DarkButton title="등록하기" />
      </div>
    </div>
  );
}
