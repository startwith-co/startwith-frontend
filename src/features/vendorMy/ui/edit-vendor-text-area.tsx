'use client';

import { Button } from '@/shared/ui/button';
import { useFormContext } from 'react-hook-form';

function EditVendorTextArea({
  onSave,
  isLoading,
}: {
  onSave: () => void;
  isLoading: boolean;
}) {
  const { register, setValue, handleSubmit } = useFormContext();

  return (
    <form
      className="relative h-full rounded-2xl bg-white p-8 shadow-md"
      onSubmit={handleSubmit(() => onSave())}
    >
      <h1 className="mb-5 text-lg font-semibold">기업 상세 소개</h1>
      <textarea
        {...register('vendorExplanation')}
        className="bg-vendor-gray mb-5 min-h-[520px] w-full resize-none rounded-xl p-4 text-sm focus:outline-none"
      />
      <div className="align-center flex w-full flex-row justify-center gap-5">
        <Button
          asChild={false}
          className="bg-vendor-gray h-[40px] w-[185px] font-bold text-black hover:bg-[#3c62d6] hover:text-white"
          onClick={() => setValue('vendorExplanation', '')}
          type="button"
        >
          초기화
        </Button>
        <Button
          asChild={false}
          className="bg-vendor-gray h-[40px] w-[185px] font-bold text-black hover:bg-[#3c62d6] hover:text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? '수정 중...' : '수정 완료'}
        </Button>
      </div>
    </form>
  );
}

export default EditVendorTextArea;
