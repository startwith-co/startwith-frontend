import VendorCalculateBoard from '@/widgets/vendorCalculate/vendor-calculate-board';
import VendorEarn from '@/widgets/vendorCalculate/vendor-earn';
import VendorManage from '@/widgets/vendorCalculate/vendor-manage';
import VendorCalculateTable from '@/widgets/vendorCalculate/vendor-calculate-table';

export default function VendorCalculatePage() {
  return (
    <div className="flex w-full flex-col gap-7.5 pr-7.5">
      <div className="grid w-full grid-cols-2 gap-7.5">
        <VendorCalculateBoard />
        <VendorEarn />
      </div>
      <VendorManage />
      <VendorCalculateTable />
    </div>
  );
}
