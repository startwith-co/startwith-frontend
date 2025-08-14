'use client';

import EditButton from '@/features/vendorMy/ui/edit-button';
import Input from '@/shared/ui/input';
import { useFormContext } from 'react-hook-form';

export default function VendorTotalSetting({
  onSave,
  isLoading,
}: {
  onSave: () => void;
  isLoading: boolean;
}) {
  const { register, handleSubmit } = useFormContext();

  return (
    <form
      className="flex w-full flex-col gap-7.5 rounded-md bg-white px-6.5 py-7.5 shadow-md"
      onSubmit={handleSubmit(() => onSave())}
    >
      <h2 className="font-semibold">총 거래 건수 및 총 기업 고객수 설정</h2>
      <div className="flex flex-col gap-7.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">총 거래 건수</span>
          <Input
            className="bg-vendor-gray w-[225px] border-none text-center"
            type="number"
            {...register('orderCount', { valueAsNumber: true })}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">총 기업 고객수</span>
          <Input
            className="bg-vendor-gray w-[225px] border-none text-center"
            type="number"
            {...register('clientCount', { valueAsNumber: true })}
          />
        </div>
      </div>
      <div className="mt-7.5 flex justify-center">
        <EditButton
          onClick={() => {}}
          title="수정 완료"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}
