'use client';

import EditButton from '@/features/vendorMy/ui/edit-button';
import VendorDropInput from '@/shared/ui/vendor-drop-input';
import { useFormContext } from 'react-hook-form';

export default function VendorUploadBanner() {
  const { setValue } = useFormContext();

  return (
    <div className="flex w-full flex-col gap-7.5 rounded-md bg-white px-6.5 py-7.5 shadow-md">
      <h2 className="font-semibold">밴더 상세페이지 배너 이미지</h2>
      <div>
        <VendorDropInput
          title="대표 이미지 등록"
          accept={['image/jpg', 'image/png']}
          onChange={(file) => setValue('vendorBannerImageUrl', file)}
          className="h-[215px] w-full"
        />
      </div>
      <div className="flex justify-center">
        <EditButton onClick={() => {}} title="수정 완료" />
      </div>
    </div>
  );
}
