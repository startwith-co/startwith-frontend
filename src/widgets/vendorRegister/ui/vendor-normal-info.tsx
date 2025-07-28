'use client';

import Input from '@/shared/ui/input';
import {
  industryCategory,
  scaleCategory,
  serviceCategory,
} from '@/entities/vendorRegister/model/vendor-normal-info-category';
import VendorSelect from '@/shared/ui/vendor-select';
import { Controller, useFormContext } from 'react-hook-form';
import cn from '@/shared/lib/utils';
import ErrorMessage from '@/shared/ui/error-message';

export default function VendorNormalInfo() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const solutionName = watch('solutionName');
  const solutionDetail = watch('solutionDetail');

  return (
    <div className="rounded-md bg-white px-[35px] py-7.5 shadow-md 2xl:pr-[104px]">
      <h2 className="mb-6 text-lg font-semibold">솔루션 기본 정보 입력</h2>
      <ul className="flex w-full flex-col gap-6 [&>li]:flex [&>li]:items-center [&>li>span]:w-[139px] [&>li>span]:text-[13px]">
        <li>
          <span className="mr-4">
            솔루션명<span className="text-red-500">*</span>
          </span>
          <div className="relative w-full">
            <Input
              className={cn(
                'bg-vendor-gray border placeholder:text-[13px]',
                errors.solutionName && 'border-red-500 focus:border-red-500',
              )}
              maxLength={100}
              placeholder="솔루션명을 입력해주세요."
              {...register('solutionName')}
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-[13px]">
              {solutionName?.length || 0}/100
            </span>
          </div>
        </li>
        <li>
          <span className="mr-4">
            솔루션 기본 설명<span className="text-red-500">*</span>
          </span>
          <div className="relative w-full">
            <Input
              className={cn(
                'bg-vendor-gray pr-20 placeholder:text-[13px]',
                errors.solutionDetail && 'border-red-500 focus:border-red-500',
              )}
              maxLength={300}
              placeholder="솔루션 기본 설명을 입력해주세요."
              {...register('solutionDetail')}
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-[13px]">
              {solutionDetail?.length || 0}/300
            </span>
          </div>
        </li>
        <li>
          <span>
            솔루션 카테고리<span className="text-red-500">*</span>
          </span>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <>
                <VendorSelect
                  options={serviceCategory}
                  placeholder="솔루션 카테고리 선택"
                  triggerClassName="w-[220px] h-[40px]"
                  itemsClassName="px-5"
                  {...field}
                />
                {errors.category && (
                  <ErrorMessage
                    message={`${errors.category.message}`}
                    className="ml-5"
                  />
                )}
              </>
            )}
          />
        </li>
        <li>
          <span>
            도입 가능 산업군<span className="text-red-500">*</span>
          </span>
          <Controller
            control={control}
            name="industry"
            render={({ field }) => {
              const selected = field.value?.split(',').filter(Boolean) || [];
              const toggleItem = (item: string) => {
                const newSelected = selected.includes(item)
                  ? selected.filter((i: string) => i !== item)
                  : [...selected, item];
                field.onChange(newSelected.join(','));
              };

              const removeItem = (item: string) => {
                const filtered = selected.filter((i: string) => i !== item);
                field.onChange(filtered.join(','));
              };

              return (
                <div className="flex items-center">
                  <VendorSelect
                    options={industryCategory}
                    placeholder="산업군 카테고리 선택"
                    triggerClassName="w-[220px] h-[40px]"
                    onChange={(val: string) => toggleItem(val)}
                  />
                  {selected.length > 0 && (
                    <div className="flex">
                      {selected.map((item: string) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => removeItem(item)}
                          className="bg-vendor-gray hover:bg-primary ml-5 h-[40px] rounded-md px-2 py-1 text-xs hover:text-white"
                        >
                          {item}
                          <span className="text-vendor-secondary ml-2 text-xs font-extrabold">
                            ✕
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {errors.industry && (
                    <ErrorMessage
                      message={`${errors.industry.message}`}
                      className="ml-5"
                    />
                  )}
                </div>
              );
            }}
          />
        </li>
        <li>
          <span>
            도입 가능 기업 규모<span className="text-red-500">*</span>
          </span>
          <Controller
            control={control}
            name="recommendedCompanySize"
            render={({ field }) => {
              const { value = [], onChange } = field;

              const toggleSelection = (item: string) => {
                if (value.includes(item)) {
                  onChange(value.filter((v: string) => v !== item));
                } else {
                  onChange([...value, item]);
                }
              };

              return (
                <div className="flex items-center gap-5">
                  {scaleCategory.map((item) => {
                    const isSelected = value.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        className={cn(
                          'bg-vendor-gray hover:bg-primary rounded-md px-[15px] py-[13px] text-xs hover:text-white',
                          {
                            'bg-primary text-white': isSelected,
                          },
                        )}
                        onClick={() => toggleSelection(item)}
                      >
                        {item}
                      </button>
                    );
                  })}
                  {errors.recommendedCompanySize && (
                    <ErrorMessage
                      message={`${errors.recommendedCompanySize.message}`}
                    />
                  )}
                </div>
              );
            }}
          />
        </li>
      </ul>
    </div>
  );
}
