'use client';

import cn from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import DarkBox from '@/shared/ui/dark-box';
import Dropdown from '@/shared/ui/dropdown';
import Input from '@/shared/ui/input';
import { useState } from 'react';

export default function VendorManage() {
  const [period, setPeriod] = useState('오늘');

  return (
    <div className="h-[333px] w-full rounded-md border-2 border-[#404040] px-8 py-7.5">
      <h2 className="mb-5 text-lg font-semibold text-white">정산 관리</h2>
      <ul className="flex flex-col gap-6">
        <li className="flex w-[275px] items-center justify-between">
          <span className="text-[13px] text-white">처리 상태</span>
          <Dropdown
            buttonClassName="bg-[#3D3D3D] w-[195px] justify-between py-2 px-3 text-white font-normal"
            buttonText="정산 대기"
            items={[
              { label: '전체' },
              { label: '정산 완료' },
              { label: '정산 대기' },
            ]}
          />
        </li>
        <li className="flex w-[275px] items-center justify-between">
          <span className="text-[13px] text-white">키워드</span>
          <Input
            className="w-[195px] border-0 bg-[#3D3D3D] text-white"
            placeholder="키워드를 입력해주세요"
          />
        </li>
        <li className="flex">
          <div className="flex w-[275px] items-center justify-between">
            <span className="text-[13px] text-white">조회 기간</span>
            <div className="grid w-[195px] grid-cols-3">
              {(['오늘', '1주일', '1개월'] as const).map((type, index) => (
                <button
                  key={type}
                  onClick={() => setPeriod(type)}
                  className={cn(
                    'border border-[#AAAAAA] px-1 py-3 text-xs',
                    period === type
                      ? 'bg-black text-white'
                      : 'bg-[#3D3D3D] text-[#AAAAAA]',
                    index === 0 && 'rounded-l-md',
                    index === 2 && 'rounded-r-md',
                  )}
                >
                  {/* eslint-disable-next-line */}
                  {type === '오늘'
                    ? '오늘'
                    : type === '1주일'
                      ? '1주일'
                      : '1개월'}
                </button>
              ))}
            </div>
          </div>
          <DarkBox className="ml-7.5 flex w-[297px] items-center justify-between px-12.5 text-white">
            <span>2025.04.01</span>
            <span>→</span>
            <span>Today</span>
          </DarkBox>
        </li>
      </ul>
      <div className="mt-7.5 flex gap-3.5">
        <Button asChild={false} variant="vendorBlack">
          조회
        </Button>
        <Button asChild={false} variant="vendorGray">
          초기화
        </Button>
      </div>
    </div>
  );
}
