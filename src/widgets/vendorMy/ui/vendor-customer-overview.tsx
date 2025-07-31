'use client';

import EditButton from '@/features/vendorMy/ui/edit-button';
import Input from '@/shared/ui/input';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function VendorCustomerOverview() {
  const { register, control } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: 'stats',
  }) as any;

  // 매출 규모 필터링
  const salesStats = fields.filter(
    (item: any) => item.statType === 'SALES_SIZE',
  );
  // 고용인원 규모 필터링
  const employeeStats = fields.filter(
    (item: any) => item.statType === 'EMPLOYEES_SIZE',
  );

  return (
    <div className="flex w-2/3 flex-col gap-7.5 rounded-md bg-white px-6.5 py-7.5 shadow-md">
      <h2 className="font-semibold">자사 기업 고객 개요</h2>
      <div className="grid grid-cols-2 gap-14.5">
        <div className="flex flex-col">
          <span>매출 규모별 기업 고객 개요</span>
          <ul className="mt-5 flex flex-col gap-5">
            {salesStats.map((field: any, index: number) => (
              <li
                key={field.id}
                className="grid grid-cols-2 items-center gap-5"
              >
                <div className="bg-vendor-gray flex h-12 items-center justify-center rounded-md px-2 py-1 text-sm">
                  {field.label}
                </div>
                <Input
                  className="bg-vendor-gray h-12 text-center"
                  placeholder="0%"
                  defaultValue={field.percentage}
                  {...register(`stats.${fields.indexOf(field)}.percentage`, {
                    valueAsNumber: true,
                  })}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span>고용인원 규모별 고객 개요</span>
          <ul className="mt-5 flex flex-col gap-5">
            {employeeStats.map((field: any, index: number) => (
              <li
                key={field.id}
                className="grid grid-cols-2 items-center gap-5"
              >
                <div className="bg-vendor-gray flex h-12 items-center justify-center rounded-md px-2 py-1 text-sm">
                  {field.label}
                </div>
                <Input
                  className="bg-vendor-gray h-12 text-center"
                  placeholder="0%"
                  defaultValue={field.percentage}
                  {...register(`stats.${fields.indexOf(field)}.percentage`, {
                    valueAsNumber: true,
                  })}
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
