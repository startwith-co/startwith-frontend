'use client';

import Solu from '@/shared/ui/solu';
import { Button } from '@/shared/ui/button';
import React, { useEffect, useMemo, useState } from 'react';
import { useSolution } from '@/shared/model/SolutionProvider';
import { categoryToKo } from '@/shared/model/categoryMap';
import cn from '@/shared/lib/utils';
import ChatVendorCancelModal from './chat-vendor-cancel-modal';

interface FirestoreTS {
  seconds: number;
  nanoseconds: number;
}

interface ChatCompleteCardProps {
  solutionName: string;
  solutionCategory: string;
  solutionPrice: number;
  createdAt: FirestoreTS;
  isMine: boolean;
}

const formatPrice = (num: number) => `${num.toLocaleString('ko-KR')}(VAT 포함)`;

function timestampToDate(ts: FirestoreTS): Date {
  return new Date(ts.seconds * 1000 + Math.floor(ts.nanoseconds / 1_000_000));
}

function msToHMS(ms: number) {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function ChatUserPayCompleteCard({
  solutionName,
  solutionCategory,
  solutionPrice,
  createdAt,
  isMine,
}: ChatCompleteCardProps) {
  const [open, setOpen] = useState(false);
  const { setSolution } = useSolution();

  const createdAtDate = useMemo(() => timestampToDate(createdAt), [createdAt]);
  const expireAt = useMemo(
    () => new Date(createdAtDate.getTime() + 24 * 60 * 60 * 1000),
    [createdAtDate],
  );

  const [now, setNow] = useState(() => Date.now());
  const remainingMs = Math.max(0, expireAt.getTime() - now);
  const isCancelable = remainingMs > 0;

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        'w-[360px] space-y-4 rounded-xl border p-6',
        isMine ? 'bg-[#DBE8FF]' : 'bg-[#F1F1F1]',
      )}
    >
      <div className="flex items-center justify-center gap-2 font-bold">
        <Solu /> 결제 완료
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-bold">계약명(솔루션명)</span>
          <span>{solutionName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">솔루션 카테고리</span>
          <span>{categoryToKo[solutionCategory]}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">결제 금액</span>
          <span className="text-base font-bold">
            {formatPrice(solutionPrice)}
          </span>
        </div>

        {isCancelable ? (
          <div className="rounded-md text-xs text-[#0F172A]">
            <div className="flex items-center justify-between">
              <b>취소 가능 기한</b>
              <span>{expireAt.toLocaleString('ko-KR')}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <b>남은 시간</b>
              <span className="tabular-nums">{msToHMS(remainingMs)}</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-red-600">
            결제일로부터 24시간이 경과하여 취소가 불가능합니다.
          </p>
        )}

        <p className="text-xs leading-5 text-[#7A7A7A]">
          결제일로부터 24시간 이내에 결제 취소 및 전액 환불이 가능합니다.
          <br />
          <br />
          단, 24시간 경과 후 발생하는 환불 요청에 대해서는 계약 당사자 간의 개별
          협의에 따라 처리되며,
          <b className="font-bold">
            {' '}
            SOLU는 해당 환불 절차 및 결과에 대하여 일체 관여하지 않습니다.
          </b>
        </p>

        <p className="text-xs leading-5 text-[#7A7A7A]">
          <b className="font-bold">결제 수단에 따른 구매 확정 시점</b>은 다음과
          같습니다.
          <br />
          • 무통장 입금 : 결제 완료와 동시에 구매가 확정됩니다.
          <br />• 신용카드 결제 : 결제일 기준 7일 후 자동으로 구매가 확정됩니다.
        </p>

        <p className="text-xs leading-5 text-[#7A7A7A]">
          구매 확정 이후 제기되는 환불 요청 또한 계약 당사자 간 협의에 따라 개별
          처리되며,
          <b className="font-bold">
            {' '}
            SOLU는 이와 관련한 책임 또는 개입 의무를 지지 않습니다.
          </b>
        </p>
      </div>

      <Button
        asChild={false}
        onClick={() => {
          setOpen(true);
          setSolution({ solutionName, solutionCategory, solutionPrice });
        }}
        variant="bgBlueGradient"
        className="mt-4 h-[40px] w-full text-sm text-white disabled:opacity-50"
        disabled={!isCancelable}
      >
        결제 취소하기
      </Button>

      <ChatVendorCancelModal
        open={open}
        setOpen={setOpen}
        solutionName={solutionName}
        solutionPrice={solutionPrice}
        solutionCategory={solutionCategory}
      />
    </div>
  );
}

export default ChatUserPayCompleteCard;
