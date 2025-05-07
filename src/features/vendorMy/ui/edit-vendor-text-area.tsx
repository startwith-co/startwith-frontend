'use client';

import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { toast } from 'react-toastify';

function EditVendorTextArea() {
  const [text, setText] = useState('');

  const maxChars = 500;

  const handleSubmit = () => {
    toast.success(`제출 완료 내용: ${text}`);
  };

  const handleReset = () => {
    setText('');
  };
  return (
    <div className="relative ml-5 h-full rounded-2xl border-2 border-[#404040] bg-[#212121] p-8 shadow-md">
      <h1 className="mb-5 text-lg text-white">기업 상세 소개</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, maxChars))}
        placeholder="리뷰를 입력해주세요..."
        className="mb-5 min-h-[520px] w-full resize-none rounded-xl bg-[#3D3D3D] p-4 text-sm text-white focus:outline-none"
      />
      <div className="absolute right-4 bottom-7 text-xs text-white">
        {text.length}/{maxChars}자
      </div>
      <div className="align-center flex w-full flex-row justify-center gap-5">
        <Button
          asChild={false}
          className="h-[40px] w-[185px] bg-[#3D3D3D] font-bold text-white hover:bg-[#3c62d6]"
          onClick={handleReset}
        >
          초기화
        </Button>
        <Button
          asChild={false}
          className="h-[40px] w-[185px] bg-[#000000] font-bold text-white hover:bg-[#3c62d6]"
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
