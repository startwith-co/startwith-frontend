'use client';

import { Button } from '@/shared/ui/button';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';

function EditVendorTextArea({
  onSave,
  isLoading,
}: {
  onSave: () => void;
  isLoading: boolean;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isDirty, errors },
    control,
  } = useFormContext();

  const text = useWatch({ control, name: 'vendorExplanation' }) || '';

  // 500자 초과 입력 방지
  useEffect(() => {
    if (text.length > 500) {
      setValue('vendorExplanation', text.slice(0, 500), { shouldDirty: true });
    }
  }, [text, setValue]);

  return (
    <form
      className="relative h-full rounded-2xl bg-white p-8 shadow-md"
      onSubmit={handleSubmit(() => onSave())}
    >
      <h1 className="mb-5 text-lg font-semibold">기업 상세 소개</h1>

      <textarea
        {...register('vendorExplanation', {
          required: '기업 소개를 입력해주세요.',
          maxLength: {
            value: 500,
            message: '기업 소개는 최대 500자까지만 입력 가능합니다.',
          },
        })}
        className="bg-vendor-gray mb-2 min-h-[520px] w-full resize-none rounded-xl p-4 text-sm focus:outline-none"
        placeholder="기업 소개를 입력해주세요. (최대 500자)"
        maxLength={500}
        onChange={(e) => {
          const trimmed = e.target.value.slice(0, 500);
          setValue('vendorExplanation', trimmed, { shouldDirty: true });
        }}
      />

      {/* 남은 글자 수 */}
      <div className="mb-3 text-right text-xs text-gray-500">
        {text.length}/500
      </div>

      {/* 에러 메시지 */}
      {errors.vendorExplanation && (
        <p className="mb-3 text-sm text-red-500">
          {`${errors.vendorExplanation.message}`}
        </p>
      )}

      <div className="align-center flex w-full flex-row justify-center gap-5">
        <Button
          asChild={false}
          className="h-[40px] w-[185px]"
          variant="graySubmit"
          onClick={() =>
            setValue('vendorExplanation', '', { shouldDirty: true })
          }
          type="button"
        >
          초기화
        </Button>
        <Button
          asChild={false}
          className="h-[40px] w-[185px]"
          variant="graySubmit"
          type="submit"
          disabled={!isDirty || isLoading}
        >
          {isLoading ? '수정 중...' : '수정 완료'}
        </Button>
      </div>
    </form>
  );
}

export default EditVendorTextArea;
