'use client';

import VendorSelect from '@/shared/ui/vendor-select';

export default function VendorManage() {
  return (
    <div className="h-[139px] w-full rounded-md bg-white px-8 py-7.5 shadow-md">
      <h2 className="mb-5 text-lg font-semibold">정산 처리 상태</h2>
      <div className="flex items-center gap-22">
        <span>처리 상태</span>
        <VendorSelect
          onChange={() => {}}
          options={['전체', '정산 완료', '정산 대기']}
          placeholder="정산 대기"
          triggerClassName="h-[40px] w-[220px] rounded-md bg-vendor-gray font-light items-center flex text-xs"
          itemsClassName="justify-center font-light bg-vendor-gray"
        />
      </div>
    </div>
  );
}
