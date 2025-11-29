'use client';

import EditButton from '@/features/vendorMy/ui/edit-button';
import VendorLogoDropInput from '@/shared/ui/vendor-logo-drop-input';
import { useFormContext } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import Image from 'next/image';

export default function VendorUploadLogo({
  onSave,
  isLoading,
}: {
  onSave: () => void;
  isLoading: boolean;
}) {
  const { setValue, watch, handleSubmit } = useFormContext();
  const clientInfos = watch('clientInfos') || [];

  const previewUrls = useMemo(() => {
    const urls: (string | null)[] = [];
    clientInfos.forEach((file: File | null | undefined) => {
      if (file instanceof File && file.name) {
        urls.push(URL.createObjectURL(file));
      } else {
        urls.push(null);
      }
    });

    while (urls.length < 5) {
      urls.push(null);
    }
    return urls;
  }, [clientInfos]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  const onFileChange = (index: number, file: File | null) => {
    const updatedFiles = [...clientInfos];
    updatedFiles[index] = file;

    setValue('clientInfos', updatedFiles, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onRemove = (index: number) => {
    const updatedFiles = [...clientInfos];
    updatedFiles[index] = null;
    setValue('clientInfos', updatedFiles, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <form
      className="flex w-full flex-col justify-between gap-7.5 rounded-md bg-white px-6.5 py-7.5 shadow-md"
      onSubmit={handleSubmit(() => onSave())}
    >
      <h2 className="font-semibold">주요 기업 고객 로고 관리</h2>
      <div className="grid grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={Math.random()} className="relative">
            {previewUrls[i] ? (
              <>
                <Image
                  src={previewUrls[i]!}
                  alt={`고객 로고 ${i + 1}`}
                  width={100}
                  height={100}
                  className="aspect-square h-full w-full rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="bg-opacity-50 absolute top-1 right-1 rounded bg-black px-2 py-1 text-xs text-white"
                >
                  삭제
                </button>
              </>
            ) : (
              <VendorLogoDropInput
                title="대표 이미지 등록"
                accept={['image/jpg', 'image/png']}
                onChange={(file) => onFileChange(i, file)}
                className="aspect-square w-full text-xs"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <EditButton
          onClick={() => {}}
          title="수정 완료"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}
