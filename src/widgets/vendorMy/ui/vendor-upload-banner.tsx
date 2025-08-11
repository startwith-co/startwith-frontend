'use client';

import EditButton from '@/features/vendorMy/ui/edit-button';
import VendorDropInput from '@/shared/ui/vendor-drop-input';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function VendorUploadBanner({ onSave }: { onSave: () => void }) {
  const { setValue, control, handleSubmit } = useFormContext();
  const file = useWatch({ control, name: 'vendorBannerImageUrl' });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file instanceof File && file.name) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }

    setPreviewUrl(null);
    return () => null;
  }, [file]);

  return (
    <form
      className="flex w-full flex-col gap-7.5 rounded-md bg-white px-6.5 py-7.5 shadow-md"
      onSubmit={handleSubmit(() => onSave())}
    >
      <h2 className="font-semibold">밴더 상세페이지 배너 이미지</h2>

      <div className="relative h-[215px] w-full overflow-hidden rounded-md border bg-gray-50">
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt="미리보기"
              width={215}
              height={175}
              className="h-full w-full object-cover"
              onError={() => setPreviewUrl(null)}
            />
            <button
              onClick={() => setValue('vendorBannerImageUrl', new File([], ''))}
              type="button"
              className="bg-opacity-50 hover:bg-opacity-70 absolute top-2 right-2 rounded bg-black px-3 py-1 text-sm text-white"
            >
              이미지 삭제
            </button>
          </>
        ) : (
          <VendorDropInput
            title="대표 이미지 등록"
            accept={['image/jpg', 'image/png']}
            onChange={(e) => setValue('vendorBannerImageUrl', e)}
            className="h-full w-full"
          />
        )}
      </div>

      <div className="flex justify-center">
        <EditButton onClick={() => {}} title="수정 완료" />
      </div>
    </form>
  );
}
