'use client';

import { useState } from 'react';
import DarkBox from '@/shared/ui/dark-box';
import cn from '@/shared/lib/utils';

function VendorProfileSide({ audit }: { audit: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="mb-4 flex items-center gap-2.5 rounded-3xl border-2 border-white px-2.5 py-1.5">
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'size-3.5 rounded-full bg-orange-500',
            audit ? 'bg-green-500' : 'bg-orange-500',
          )}
        />
        <span className="text-[13px] text-white">
          {audit ? '입점 심사 완료' : '입점 심사 중'}
        </span>
      </div>
      <div
        className="flex size-3.5 cursor-pointer items-center justify-center rounded-full bg-black"
        onMouseEnter={handleModalOpen}
        onMouseLeave={handleModalClose}
      >
        <span className="text-[13px] text-white">?</span>
        {isModalOpen && (
          <DarkBox className="absolute top-0 left-full z-50 flex w-[338px] p-7.5 shadow-md">
            <div className="flex w-full flex-col items-center gap-5">
              <h2 className="font-semibold">입점 심사란?</h2>
              <p className="text-center text-sm text-[#7A7A7A] [&>span]:font-bold">
                <span>SOLU</span>는 기업 고객이 신뢰할 수 있는 솔루션만을
                제공하기 위해, 입점 신청 시 <span>간단한 사전 심사 절차</span>
                를 운영하고 있습니다. <br />
                <br />
                <span>사업자 등록 여부와 솔루션의 전문성</span> 등을 종합적으로
                확인한 후, <span>영업일 기준 3일 이내에 심사 결과를 안내</span>
                드릴 예정이오니, 결과 안내까지 잠시만 기다려주시면
                감사하겠습니다. <br />
                <br />
                <span>SOLU</span> 관련 문의는 언제든지
                startwith0325@gmail.com으로 보내주시면 빠르고 정성껏 안내
                도와드리겠습니다. <br />
                <br />
                <span>SOLU</span>와 함께 해주셔서 진심으로 감사드립니다.
              </p>
            </div>
          </DarkBox>
        )}
      </div>
    </div>
  );
}
export default VendorProfileSide;
