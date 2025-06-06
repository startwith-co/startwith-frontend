'use client';

import EditButton from '@/features/vendorMy/ui/edit-button';
import { Button } from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { useFormContext, Controller } from 'react-hook-form';
import cn from '@/shared/lib/utils';

export default function VendorTimeSetting() {
  const { control, getValues, register } = useFormContext();

  return (
    <div className="rounded-md bg-white p-8 shadow-md">
      <h2 className="mb-4 font-semibold">상담가능 요일 및 시간 설정</h2>

      <div className="mb-10 flex flex-col gap-5">
        <div className="grid grid-cols-2 items-center gap-5">
          <Controller
            control={control}
            name="weekdayAvailable"
            render={({ field }) => (
              <Button
                asChild={false}
                className={cn(
                  'bg-vendor-gray text-vendor-secondary h-15 min-w-[60px] border-none text-center',
                  getValues('weekdayAvailable') ? 'bg-primary text-white' : '',
                )}
                onClick={() => field.onChange(!field.value)}
                type="button"
              >
                평일 상담 가능
              </Button>
            )}
          />

          <div className="flex items-center gap-1">
            <Input
              placeholder="09시"
              className="bg-vendor-gray h-15 w-[80px] border-none text-center"
              {...register('weekdayStartTime')}
            />
            <span className="mx-1">~</span>
            <Input
              placeholder="18시"
              className="bg-vendor-gray h-15 w-[80px] border-none text-center"
              {...register('weekdayEndTime')}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-5">
          <Controller
            control={control}
            name="weekendAvailable"
            render={({ field }) => (
              <Button
                asChild={false}
                className={cn(
                  'bg-vendor-gray text-vendor-secondary h-15 min-w-[60px] border-none text-center',
                  getValues('weekendAvailable') ? 'bg-primary text-white' : '',
                )}
                onClick={() => field.onChange(!field.value)}
                type="button"
              >
                주말 상담 가능
              </Button>
            )}
          />
          <div className="flex items-center gap-1">
            <Input
              placeholder="09시"
              className="bg-vendor-gray h-15 w-[80px] border-none text-center"
              {...register('weekendStartTime')}
            />
            <span className="mx-1">~</span>
            <Input
              placeholder="18시"
              className="bg-vendor-gray h-15 w-[80px] border-none text-center"
              {...register('weekendEndTime')}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-5">
          <Controller
            control={control}
            name="holidayAvailable"
            render={({ field }) => (
              <Button
                asChild={false}
                className={cn(
                  'bg-vendor-gray text-vendor-secondary h-15 min-w-[60px] border-none text-center',
                  {
                    'bg-primary text-white': getValues('holidayAvailable'),
                  },
                )}
                onClick={() => field.onChange(!field.value)}
                type="button"
              >
                공휴일 상담 가능
              </Button>
            )}
          />
          <div className="flex items-center gap-1">
            <Input
              placeholder="09시"
              className="bg-vendor-gray h-15 w-[80px] border-none text-center"
              {...register('holidayStartTime')}
            />
            <span className="mx-1">~</span>
            <Input
              placeholder="18시"
              className="bg-vendor-gray h-15 w-[80px] border-none text-center"
              {...register('holidayEndTime')}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <EditButton onClick={() => {}} title="수정 완료" />
      </div>
    </div>
  );
}
