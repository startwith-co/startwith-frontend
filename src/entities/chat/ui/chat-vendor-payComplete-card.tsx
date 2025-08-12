import Solu from '@/shared/ui/solu';
import { Button } from '@/shared/ui/button';
import React, { useEffect, useMemo, useState } from 'react';
import { categoryToKo } from '@/shared/model/categoryMap';
import cn from '@/shared/lib/utils';
import ChatVendorCancelModal from './chat-vendor-cancel-modal';

interface ChatCompleteCardProps {
  solutionName: string;
  solutionCategory: string;
  solutionPrice: number;
  isMine: boolean;
  createdAt: { seconds: number; nanoseconds: number };
}

const formatPrice = (num: number) => `${num.toLocaleString('ko-KR')}(VAT 포함)`;

function timestampToDate(ts: { seconds: number; nanoseconds: number }): Date {
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

function ChatVendorPayCompleteCard({
  solutionName,
  solutionCategory,
  solutionPrice,
  isMine,
  createdAt,
}: ChatCompleteCardProps) {
  const [open, setOpen] = useState(false);

  const createdAtDate = useMemo(() => timestampToDate(createdAt), [createdAt]);
  const expireAt = useMemo(
    () => new Date(createdAtDate.getTime() + 24 * 60 * 60 * 1000),
    [createdAtDate],
  );

  const [now, setNow] = useState(Date.now());
  const remainingMs = Math.max(0, expireAt.getTime() - now);
  const isCancelable = remainingMs > 0;

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        'w-[360px] space-y-4 rounded-xl border p-6 shadow-md',
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

        {isCancelable && (
          <div className="rounded-md p-2 text-xs text-[#0F172A]">
            <div className="flex items-center justify-between">
              <b>취소 가능 기한</b>
              <span>{expireAt.toLocaleString('ko-KR')}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <b>남은 시간</b>
              <span className="tabular-nums">{msToHMS(remainingMs)}</span>
            </div>
          </div>
        )}

        {!isCancelable && (
          <p className="text-xs text-red-600">
            결제일로부터 24시간이 경과하여 취소가 불가능합니다.
          </p>
        )}
      </div>

      <Button
        asChild={false}
        onClick={() => setOpen(true)}
        variant="textBlue"
        className="mt-4 h-[40px] w-full border border-[#CBD5E1] bg-white text-sm text-[#0F172A] shadow-sm"
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

export default ChatVendorPayCompleteCard;
