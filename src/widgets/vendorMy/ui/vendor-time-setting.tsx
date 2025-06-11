'use client';

import EditButton from '@/features/vendorMy/ui/edit-button';
import { Button } from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { useFormContext, Controller } from 'react-hook-form';
import cn from '@/shared/lib/utils';
import ErrorMessage from '@/shared/ui/error-message';
import { formatTime, deformatTime } from '../utils/formatTime';

export default function VendorTimeSetting() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const weekdayAvailable = watch('weekdayAvailable');
  const weekendAvailable = watch('weekendAvailable');
  const holidayAvailable = watch('holidayAvailable');

  return (
    <div className="rounded-md bg-white p-8 shadow-md">
      <h2 className="mb-4 font-semibold">상담가능 요일 및 시간 설정</h2>
      <ErrorMessage
        message={
          errors.weekdayStartTime?.message?.toString() ||
          errors.weekdayEndTime?.message?.toString() ||
          errors.weekendStartTime?.message?.toString() ||
          errors.weekendEndTime?.message?.toString() ||
          errors.holidayStartTime?.message?.toString() ||
          errors.holidayEndTime?.message?.toString() ||
          ''
        }
        className="mb-5"
      />

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
                  weekdayAvailable ? 'bg-primary text-white' : '',
                )}
                onClick={() => field.onChange(!field.value)}
                type="button"
              >
                평일 상담 가능
              </Button>
            )}
          />

          <div className="flex items-center gap-1">
            <Controller
              control={control}
              name="weekdayStartTime"
              render={({ field }) => (
                <Input
                  value={formatTime(field.value)}
                  onChange={(e) => field.onChange(deformatTime(e.target.value))}
                  type="time"
                  className="bg-vendor-gray h-15 w-[80px] border-none text-center"
                  disabled={!weekdayAvailable}
                />
              )}
            />
            <span className="mx-1">~</span>
            <Controller
              control={control}
              name="weekdayEndTime"
              render={({ field }) => (
                <Input
                  value={formatTime(field.value)}
                  onChange={(e) => field.onChange(deformatTime(e.target.value))}
                  type="time"
                  className="bg-vendor-gray h-15 w-[80px] border-none text-center"
                  disabled={!weekdayAvailable}
                />
              )}
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
                  weekendAvailable ? 'bg-primary text-white' : '',
                )}
                onClick={() => field.onChange(!field.value)}
                type="button"
              >
                주말 상담 가능
              </Button>
            )}
          />
          <div className="flex items-center gap-1">
            <Controller
              control={control}
              name="weekendStartTime"
              render={({ field }) => (
                <Input
                  value={formatTime(field.value)}
                  onChange={(e) => field.onChange(deformatTime(e.target.value))}
                  type="time"
                  className="bg-vendor-gray h-15 w-[80px] border-none text-center"
                  disabled={!weekendAvailable}
                />
              )}
            />
            <span className="mx-1">~</span>
            <Controller
              control={control}
              name="weekendEndTime"
              render={({ field }) => (
                <Input
                  value={formatTime(field.value)}
                  onChange={(e) => field.onChange(deformatTime(e.target.value))}
                  type="time"
                  className="bg-vendor-gray h-15 w-[80px] border-none text-center"
                  disabled={!weekendAvailable}
                />
              )}
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
                    'bg-primary text-white': holidayAvailable,
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
            <Controller
              control={control}
              name="holidayStartTime"
              render={({ field }) => (
                <Input
                  value={formatTime(field.value)}
                  onChange={(e) => field.onChange(deformatTime(e.target.value))}
                  type="time"
                  className="bg-vendor-gray h-15 w-[80px] border-none text-center"
                  disabled={!holidayAvailable}
                />
              )}
            />
            <span className="mx-1">~</span>
            <Controller
              control={control}
              name="holidayEndTime"
              render={({ field }) => (
                <Input
                  value={formatTime(field.value)}
                  onChange={(e) => field.onChange(deformatTime(e.target.value))}
                  type="time"
                  className="bg-vendor-gray h-15 w-[80px] border-none text-center"
                  disabled={!holidayAvailable}
                />
              )}
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
