'use client';

import Input from '@/shared/ui/input';
import VendorDropInput from '@/shared/ui/vendor-drop-input';
import VendorSelect from '@/shared/ui/vendor-select';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import ErrorMessage from '@/shared/ui/error-message';
import { CircleX } from 'lucide-react';

export default function VendorDetailInfo() {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'solutionEffect',
  });

  const representImageUrl = watch('representImageUrl');
  const descriptionPdfUrl = watch('descriptionPdfUrl');

  /** 대표 이미지 / PDF 파일 업데이트 */
  const handleRepresentImageChange = (fieldName: string, file: File | null) => {
    setValue(fieldName, file);
  };

  return (
    <div className="rounded-md bg-white px-[35px] py-7.5 shadow-md 2xl:pr-[104px]">
      <h2 className="mb-6 text-lg font-semibold">솔루션 상세 정보</h2>

      <ul className="flex w-full flex-col gap-6 text-[13px] [&>li]:flex [&>li]:items-center [&>li>span]:w-[139px]">
        {/* 대표 이미지 */}
        <li>
          <span>
            대표 이미지<span className="text-red-500">*</span>
          </span>
          <VendorDropInput
            title="대표 이미지"
            accept={['image/*']}
            value={representImageUrl}
            onChange={(file) =>
              handleRepresentImageChange('representImageUrl', file)
            }
            className="h-[165px] w-[220px]"
          />
          {errors.representImageUrl && (
            <ErrorMessage
              message={`${errors.representImageUrl.message}`}
              className="ml-5"
            />
          )}
        </li>

        <li>
          <span>
            솔루션 상세 설명 PDF<span className="text-red-500">*</span>
          </span>
          <VendorDropInput
            title="PDF 파일 등록"
            accept={['application/pdf']}
            value={descriptionPdfUrl}
            onChange={(file) =>
              handleRepresentImageChange('descriptionPdfUrl', file)
            }
            className="h-[165px] w-[220px]"
          />
          {errors.descriptionPdfUrl && (
            <ErrorMessage
              message={`${errors.descriptionPdfUrl.message}`}
              className="ml-5"
            />
          )}
        </li>

        {fields.map((field, index) => (
          <li key={field.id} className="relative items-start!">
            <span>{`예상 도입 성과 ${index + 1}`}</span>

            <div className="relative flex flex-col items-center gap-[23px]">
              <Input
                type="text"
                maxLength={15}
                className="bg-vendor-gray w-[220px] border-none text-center"
                placeholder="도입 성과명을 입력해주세요."
                {...register(`solutionEffect.${index}.effectName`, {
                  maxLength: {
                    value: 15,
                    message: '최대 15자까지 입력 가능합니다.',
                  },
                })}
              />

              <div className="flex gap-5">
                <Input
                  type="number"
                  className="bg-vendor-gray h-[40px] w-[60px] border-none text-center"
                  placeholder="0"
                  {...register(`solutionEffect.${index}.percent`, {
                    valueAsNumber: true,
                    validate: (v) =>
                      (v >= 0 && v <= 999) || '0~999까지만 입력 가능합니다.',
                  })}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val > 999) val = 999;
                    if (val < 0) val = 0;
                    setValue(`solutionEffect.${index}.percent`, val);
                  }}
                />

                <Controller
                  control={control}
                  name={`solutionEffect.${index}.unit`}
                  defaultValue="%"
                  render={({ field: { value, onChange } }) => (
                    <VendorSelect
                      value={value}
                      onChange={(val: string) => onChange(val)}
                      options={['%', '시간']}
                      placeholder="%"
                      triggerClassName="h-[40px] w-[60px] rounded-md bg-vendor-gray font-light flex items-center justify-center text-xs"
                      itemsClassName="justify-center font-light bg-vendor-gray"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name={`solutionEffect.${index}.direction`}
                  defaultValue="INCREASE"
                  render={({ field: { value, onChange, ...rest } }) => (
                    <VendorSelect
                      {...rest}
                      value={value}
                      onChange={(label: string) =>
                        onChange(label === '증가' ? 'INCREASE' : 'DECREASE')
                      }
                      placeholder="증가"
                      options={['감소', '증가']}
                      triggerClassName="h-[40px] w-[60px] rounded-md bg-vendor-gray font-light flex items-center justify-center text-xs"
                      itemsClassName="justify-center font-light bg-vendor-gray"
                    />
                  )}
                />
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-vendor-secondary absolute top-2.5 right-[-30px]"
                aria-label={`예상 도입 성과 ${index + 1} 삭제`}
              >
                <CircleX size={16} />
              </button>
            </div>
          </li>
        ))}

        <li>
          <span>도입 성과 추가</span>
          <Button
            asChild={false}
            type="button"
            variant="ghost"
            disabled={fields.length >= 6}
            className="bg-vendor-gray w-[220px] text-center hover:text-white disabled:opacity-50"
            onClick={() =>
              append({
                effectName: '',
                percent: 0,
                unit: '%',
                direction: 'INCREASE',
              })
            }
          >
            +
          </Button>
          {errors.solutionEffect?.message && (
            <ErrorMessage
              message={`${errors.solutionEffect.message}`}
              className="ml-5"
            />
          )}
        </li>
      </ul>
    </div>
  );
}
