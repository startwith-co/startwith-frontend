'use client';

import EditButton from '@/features/vendorMy/ui/edit-button';
import { Button } from '@/shared/ui/button';
import { useFormContext, Controller } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import cn from '@/shared/lib/utils';
import ErrorMessage from '@/shared/ui/error-message';

export default function VendorTimeSetting({
  onSave,
  isLoading,
}: {
  onSave: () => void;
  isLoading: boolean;
}) {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext();

  // 시간 목록 (00:00 ~ 23:30, 30분 단위)
  const times = Array.from({ length: 48 }, (_, i) => {
    const h = String(Math.floor(i / 2)).padStart(2, '0');
    const m = i % 2 === 0 ? '00' : '30';
    return `${h}:${m}`;
  });

  const [openField, setOpenField] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenField(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <form
      className="rounded-md bg-white p-8 shadow-md"
      onSubmit={handleSubmit(() => onSave())}
    >
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

      <div ref={dropdownRef} className="flex flex-col gap-5">
        {[
          {
            label: '평일 상담 가능',
            start: 'weekdayStartTime',
            end: 'weekdayEndTime',
            flag: 'weekdayAvailable',
          },
          {
            label: '주말 상담 가능',
            start: 'weekendStartTime',
            end: 'weekendEndTime',
            flag: 'weekendAvailable',
          },
          {
            label: '공휴일 상담 가능',
            start: 'holidayStartTime',
            end: 'holidayEndTime',
            flag: 'holidayAvailable',
          },
        ].map(({ label, start, end, flag }) => {
          const available = watch(flag as any);
          const startValue = watch(start as any);
          const endValue = watch(end as any);

          return (
            <div key={label} className="grid grid-cols-2 items-center gap-5">
              {/* 상담 가능 토글 버튼 */}
              <Controller
                control={control}
                name={flag as any}
                render={({ field }) => (
                  <Button
                    asChild={false}
                    className={cn(
                      'bg-vendor-gray text-vendor-secondary h-15 min-w-[60px] border-none text-center',
                      available ? 'bg-primary text-white' : '',
                    )}
                    onClick={() => field.onChange(!field.value)}
                    type="button"
                  >
                    {label}
                  </Button>
                )}
              />

              {/* 시작 / 종료 시간 선택 */}
              <div className="relative flex items-center gap-1">
                {/* 시작 시간 */}
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      if (available) {
                        setOpenField(openField === start ? null : start);
                      }
                    }
                  }}
                  onClick={() =>
                    available &&
                    setOpenField(openField === start ? null : start)
                  }
                  className="bg-vendor-gray relative w-[90px] cursor-pointer rounded-md border border-gray-300 px-2 py-2 text-center"
                >
                  {startValue || '시작'}
                  {openField === start && (
                    <div className="absolute top-10 left-0 z-20 max-h-[200px] w-[90px] overflow-y-auto rounded-md border border-gray-300 bg-white shadow-md">
                      {times.map((time) => (
                        <div
                          key={time}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setValue(start, time);
                              setOpenField(null);
                            }
                          }}
                          onClick={() => {
                            setValue(start, time);
                            setOpenField(null);
                          }}
                          className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${
                            startValue === time
                              ? 'bg-gray-200 font-semibold'
                              : ''
                          }`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <span>~</span>

                {/* 종료 시간 */}
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      if (available) {
                        setOpenField(openField === end ? null : end);
                      }
                    }
                  }}
                  onClick={() =>
                    available && setOpenField(openField === end ? null : end)
                  }
                  className="bg-vendor-gray relative w-[90px] cursor-pointer rounded-md border border-gray-300 px-2 py-2 text-center"
                >
                  {endValue || '종료'}
                  {openField === end && (
                    <div className="absolute top-10 left-0 z-20 max-h-[200px] w-[90px] overflow-y-auto rounded-md border border-gray-300 bg-white shadow-md">
                      {times.map((time) => (
                        <div
                          key={time}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setValue(end, time);
                              setOpenField(null);
                            }
                          }}
                          onClick={() => {
                            setValue(end, time);
                            setOpenField(null);
                          }}
                          className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${
                            endValue === time ? 'bg-gray-200 font-semibold' : ''
                          }`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <EditButton
          onClick={() => {}}
          title="수정 완료"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}
