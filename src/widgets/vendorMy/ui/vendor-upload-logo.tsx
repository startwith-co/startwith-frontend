'use client';

import EditButton from '@/features/vendorMy/ui/edit-button';
import UploadInput from '@/shared/ui/upload-input';

export default function VendorUploadLogo() {
  return (
    <div className="flex w-full flex-col justify-between gap-7.5 rounded-md bg-white px-6.5 py-7.5 shadow-md">
      <h2 className="font-semibold">주요 기업 고객 로고 관리</h2>
      <div className="grid grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map(() => (
          <div key={Math.random()}>
            <UploadInput
              title="대표 이미지 등록"
              className="aspect-square text-xs"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <EditButton onClick={() => {}} title="수정 완료" />
      </div>
    </div>
  );
}
