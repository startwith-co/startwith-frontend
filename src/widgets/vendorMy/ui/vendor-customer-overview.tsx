'use client';

import EditButton from '@/features/vendorMy/ui/edit-button';
import Input from '@/shared/ui/input';

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
          <span>고용인원 규모별 고객 개요</span>
          <ul className="mt-5 flex flex-col gap-5">
            {[
              '10인 미만',
              '10인 미만 30인 이상',
              '30인 이상 50인 미만',
              '50인 이상 100인 미만',
              '100인 이상',
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
      </div>
      <div className="flex justify-center">
        <EditButton onClick={() => {}} title="수정 완료" />
      </div>
    </div>
  );
}
