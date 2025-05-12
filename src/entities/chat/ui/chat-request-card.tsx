import Solu from '@/shared/ui/solu';
import { Button } from '@/shared/ui/button';
import React from 'react';

interface ChatRequestCardProps {
  solutionName: string;
  workDate: number;
  solutionPrice: number;
  mode?: 'user' | 'vendor';
}

const formatPrice = (num: number) => {
  return `${num.toLocaleString('ko-KR')}원`;
};

function ChatRequestCardUser({
  solutionName,
  workDate,
  solutionPrice,
}: Omit<ChatRequestCardProps, 'mode'>) {
  return (
    <div className="mt-2 mb-2 w-64 rounded-xl bg-[#F5F5F5] p-4 text-black shadow-md">
      <div className="mb-4 text-center">
        <Solu />
        <span className="ml-1 font-bold">결제 요청</span>
      </div>
      <div className="mb-2">
        <div className="text-sm font-bold text-black">제공 솔루션</div>
        <div className="text-base">{solutionName}</div>
      </div>
      <div className="mt-2 flex justify-between text-base">
        <span className="font-bold">작업일</span>
        <span>{workDate}일</span>
      </div>
      <div className="mt-1 mb-4 flex justify-between text-base">
        <span className="font-bold">금액</span>
        <span>{formatPrice(solutionPrice)}</span>
      </div>
      <Button
        asChild={false}
        variant="bgBlueGradient"
        className="w-full rounded-md py-2"
      >
        결제하기
      </Button>
    </div>
  );
}

function ChatRequestCardVendor({
  solutionName,
  workDate,
  solutionPrice,
}: Omit<ChatRequestCardProps, 'mode'>) {
  return (
    <div className="mt-2 mb-2 w-64 rounded-xl bg-black p-4 text-white shadow-md">
      <div className="mb-4 text-center">
        <Solu />
        <span className="ml-1 font-semibold">결제 요청</span>
      </div>
      <div className="mb-2">
        <div className="text-sm font-semibold text-gray-400">제공 솔루션</div>
        <div className="text-base">{solutionName}</div>
      </div>
      <div className="mt-2 flex justify-between text-base">
        <span className="font-semibold">작업일</span>
        <span>{workDate}일</span>
      </div>
      <div className="mt-1 mb-4 flex justify-between text-base">
        <span className="font-semibold">금액</span>
        <span>{formatPrice(solutionPrice)}</span>
      </div>
      <Button
        asChild={false}
        variant="ghost"
        className="w-full rounded-md bg-[#3D3D3D] py-2 text-white"
      >
        결제취소
      </Button>
    </div>
  );
}

export default function ChatRequestCard(props: ChatRequestCardProps) {
  const { mode = 'user', ...rest } = props;

  return mode === 'vendor' ? (
    <ChatRequestCardVendor {...rest} />
  ) : (
    <ChatRequestCardUser {...rest} />
  );
}
