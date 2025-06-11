import VendorCalculateBoard from '@/widgets/vendorCalculate/vendor-calculate-board';
import VendorPolicy from '@/widgets/vendorCalculate/vendor-policy';
import VendorManage from '@/widgets/vendorCalculate/vendor-manage';
import VendorCalculateTable from '@/widgets/vendorCalculate/vendor-calculate-table';

export default function VendorCalculatePage() {
  return (
    <div className="flex w-full flex-col gap-7.5 pr-7.5">
      <div className="grid h-[374px] w-full grid-cols-2 gap-7.5">
        <div className="flex flex-col gap-7.5">
          <VendorCalculateBoard />
          <VendorManage />
        </div>
        <VendorPolicy />
      </div>
      <VendorCalculateTable />
    </div>
  );
}
