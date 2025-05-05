'use client';

import cn from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import DarkBox from '@/shared/ui/dark-box';
import Dropdown from '@/shared/ui/dropdown';
import Input from '@/shared/ui/input';
import { useState } from 'react';

export default function VendorCalculatePage() {
  const [period, setPeriod] = useState('오늘');

  return (
    <div className="flex w-full flex-col gap-7.5 pr-7.5">
      <div className="grid w-full grid-cols-2 gap-7.5">
        <div>
          <h2 className="mb-5 text-xl font-semibold text-white">
            정산 관리 현황
          </h2>
          <div className="flex h-[191px] items-center rounded-md border-2 border-[#404040] px-8 py-10 text-white 2xl:px-16">
            <div className="grid w-full grid-cols-4 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
              {['구매 확정 대기', '구매 확정', '환불 요청', '정산 대기'].map(
                (label) => (
                  <div key={label} className="flex flex-col items-center">
                    <DarkBox className="xs:min-w-[2.5rem] xs:max-w-[3rem] flex aspect-square w-full max-w-[2.5rem] min-w-[2rem] items-center justify-center text-xl sm:max-w-[4rem] sm:min-w-[3rem] sm:text-2xl md:max-w-[5rem] md:min-w-[3.5rem] md:text-3xl 2xl:max-w-[5.625rem] 2xl:min-w-[4rem] 2xl:text-4xl">
                      -
                    </DarkBox>
                    <span className="xs:text-[0.6rem] mt-1 text-[0.5rem] sm:text-xs 2xl:text-sm">
                      {label}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-5 text-xl font-semibold text-white">예상 정산액</h2>
          <div className="flex max-h-[191px] flex-col items-center justify-center rounded-md border-2 border-[#404040] px-8 py-10 text-white 2xl:px-16">
            <h2 className="mb-7.5 text-2xl font-bold">25.07 1주차</h2>
            <ul className="flex items-center gap-5 text-center">
              <li className="flex flex-col">
                <span>총 매출액</span>
                <span>15,000,000원</span>
              </li>
              <span className="text-xl text-white">-</span>
              <li className="flex flex-col">
                <span>결제 수수료</span>
                <span>300,000원</span>
              </li>
              <span className="text-xl text-white">-</span>
              <li className="flex flex-col">
                <span>판매 수수료</span>
                <span>900,000원</span>
              </li>
              <span className="text-xl text-white">=</span>
              <li className="flex flex-col">
                <span>예산 정산액</span>
                <span>13,800,000원</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full rounded-md border-2 border-[#404040] px-8 py-7.5">
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
    </div>
  );
}
