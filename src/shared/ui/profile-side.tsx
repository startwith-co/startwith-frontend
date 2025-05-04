'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { useState } from 'react';
import cn from '../lib/utils';
import DarkBox from './dark-box';

interface Route {
  label: string;
  href: string;
}

interface ProfileSideProps {
  routes: Route[];
  companyName: string;
  mode?: 'vendor' | 'user';
}

function ProfileSide({ routes, companyName, mode = 'user' }: ProfileSideProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <aside
      className={cn(
        'mr-5 flex min-w-[200px] flex-col items-center rounded-r-2xl px-3.5 py-9 shadow-md',
        mode === 'user'
          ? 'h-[400px] bg-white'
          : 'relative h-[567px] border-2 border-l-0 border-[#404040] bg-[#212121]',
      )}
    >
      <div className="mb-4 flex items-center gap-2.5 rounded-3xl border-2 border-[#404040] px-2.5 py-1.5">
        <div className="flex items-center gap-1.5">
          <div className="size-3.5 rounded-full bg-orange-500" />
          <span className="text-[13px] text-[#AAAAAA]">입점 심사중</span>
        </div>
        <div
          className="flex size-3.5 cursor-pointer items-center justify-center rounded-full bg-[#404040]"
          onMouseEnter={handleModalOpen}
          onMouseLeave={handleModalClose}
        >
          <span className="text-[13px] text-white">?</span>
          {isModalOpen && (
            <DarkBox className="absolute -top-20 left-full z-10 flex w-72 p-7.5 shadow-md">
              <div className="flex w-full flex-col items-center gap-5">
                <h2 className="font-semibold text-white">입점 심사란?</h2>
                <p className="text-center text-sm text-white [&>span]:font-bold">
                  <span>SOLU</span>는 기업 고객이 신뢰할 수 있는 솔루션만을
                  제공하기 위해, 입점 신청 시 <span>간단한 사전 심사 절차</span>
                  를 운영하고 있습니다. <br />
                  <br />
                  <span>사업자 등록 여부와 솔루션의 전문성</span> 등을
                  종합적으로 확인한 후,{' '}
                  <span>영업일 기준 3일 이내에 심사 결과를 안내</span>드릴
                  예정이오니, 결과 안내까지 잠시만 기다려주시면 감사하겠습니다.{' '}
                  <br />
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
      <Avatar className="mb-2.5 flex size-30 rounded-full">
        <AvatarImage src="/image/image.png" />
        <AvatarFallback>스타트윗</AvatarFallback>
      </Avatar>
      <h1
        className={cn(
          'mb-14.5 text-2xl font-bold',
          mode === 'user' ? 'text-[#000000]' : 'text-white',
        )}
      >
        {companyName}
      </h1>

      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'mb-5',
            isActive(route.href)
              ? 'text-md font-bold'
              : 'text-sm font-semibold',
            mode === 'user' ? 'text-[#000000]' : 'text-white',
          )}
        >
          {route.label}
        </Link>
      ))}
    </aside>
  );
}

export default ProfileSide;
