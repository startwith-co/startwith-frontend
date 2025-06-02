import Dropdown from '@/shared/ui/dropdown';

export default function VendorManage() {
  return (
    <div className="h-[139px] w-full rounded-md bg-white px-8 py-7.5 shadow-md">
      <h2 className="mb-5 text-lg font-semibold">정산 처리 상태</h2>
      <div className="flex items-center gap-22">
        <span>처리 상태</span>
        <Dropdown
          items={[
            { label: '전체' },
            { label: '정산 완료' },
            { label: '정산 대기' },
          ]}
          buttonText="정산 대기"
          divClassName="h-[40px] w-[220px] rounded-md bg-vendor-gray font-light items-center flex text-xs"
          buttonClassName="w-[220px] justify-between font-light bg-vendor-gray px-4"
          menuClassName="w-[220px] bg-vendor-gray"
        />
      </div>
    </div>
  );
}
