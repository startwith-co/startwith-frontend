'use client';

import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { toast } from 'react-toastify';

function EditVendorTextArea() {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    toast.success(`제출 완료 내용: ${text}`);
  };

  const handleReset = () => {
    setText('');
  };
  return (
    <div className="relative h-full rounded-2xl bg-white p-8 shadow-md">
      <h1 className="mb-5 text-lg font-semibold">기업 상세 소개</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-vendor-gray mb-5 min-h-[520px] w-full resize-none rounded-xl p-4 text-sm focus:outline-none"
      />
      <div className="align-center flex w-full flex-row justify-center gap-5">
        <Button
          asChild={false}
          className="bg-vendor-gray h-[40px] w-[185px] font-bold text-black hover:bg-[#3c62d6] hover:text-white"
          onClick={handleReset}
        >
          초기화
        </Button>
        <Button
          asChild={false}
          className="bg-vendor-gray h-[40px] w-[185px] font-bold text-black hover:bg-[#3c62d6] hover:text-white"
          onClick={handleSubmit}
          disabled={text.length === 0}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
}

export default EditVendorTextArea;
