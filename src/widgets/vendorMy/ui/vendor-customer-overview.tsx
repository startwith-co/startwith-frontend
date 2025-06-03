'use client';

import EditButton from '@/features/vendorMy/ui/edit-button';
import Input from '@/shared/ui/input';
import VendorSelect from '@/shared/ui/vendor-select';

export default function VendorCustomerOverview() {
  return (
    <div className="flex w-2/3 flex-col gap-7.5 rounded-md bg-white px-6.5 py-7.5 shadow-md">
      <h2 className="font-semibold">자사 기업 고객 개요</h2>
      <div className="grid grid-cols-2 gap-14.5">
        <div className="flex flex-col">
          <span>매출 규모별 기업 고객 개요</span>
          <ul className="mt-5 flex flex-col gap-5">
            {[
              '10억 미만',
              '10억 ~ 50억',
              '50억 ~ 100억',
              '100억 ~ 150억',
              '150억 이상',
            ].map((label) => (
              <li key={label} className="grid grid-cols-2 items-center gap-5">
                <div className="bg-vendor-gray flex h-12 items-center justify-center rounded-md px-2 py-1 text-sm">
                  {label}
                </div>
                <Input
                  className="bg-vendor-gray h-12 text-center"
                  placeholder="0%"
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span>산업별 기업 고객 개요</span>
          <div className="mt-5 flex flex-col gap-5">
            <div className="grid grid-cols-2 items-center gap-5">
              <VendorSelect
                options={[
                  'IT/인터넷',
                  '금융',
                  '제조',
                  '서비스',
                  '유통',
                  '의료',
                  '교육',
                  '건설',
                ]}
                placeholder="산업군 카테고리 선택"
                onChange={() => {}}
              />
              <Input
                className="bg-vendor-gray h-12 text-center"
                placeholder="0%"
              />
            </div>
            <button className="bg-vendor-gray text-vendor-secondary rounded-md p-2 text-xl">
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <EditButton onClick={() => {}} title="수정 완료" />
      </div>
    </div>
  );
}
