import WhiteBox from '@/shared/ui/white-box';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { VendorInfoProps } from '@/pages/vendorMy/model/type';

function formatTimeRange(available: boolean, start: string, end: string) {
  if (!available) return '상담 불가능';
  const [sh, sm] = start.split(':');
  const [eh, em] = end.split(':');
  return `${sh}:${sm} ~ ${eh}:${em}`;
}

export default function VendorInfo({
  vendorName,
  orderCount,
  clientCount,
  vendorExplanation,
  weekdayAvailable,
  weekdayStartTime,
  weekdayEndTime,
  weekendAvailable,
  weekendStartTime,
  weekendEndTime,
  holidayAvailable,
  holidayStartTime,
  holidayEndTime,
}: VendorInfoProps) {
  const weekday = formatTimeRange(
    weekdayAvailable,
    weekdayStartTime || '',
    weekdayEndTime || '',
  );
  const weekend = formatTimeRange(
    weekendAvailable,
    weekendStartTime || '',
    weekendEndTime || '',
  );
  const holiday = formatTimeRange(
    holidayAvailable,
    holidayStartTime || '',
    holidayEndTime || '',
  );

  const timeSummary = `평일 ${weekday} / 주말 ${weekend} / 공휴일 ${holiday}`;

  return (
    <WhiteBox className="flex flex-col gap-8 px-9 pt-7 pb-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-center gap-6">
          <Avatar className="size-24 shrink-0">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">{vendorName}</span>
            <p className="text-sm text-gray-700">{timeSummary}</p>
            <p className="text-sm text-gray-500">평균 응답 시간: 1시간 이내</p>
          </div>
        </div>
        <div className="grid w-full max-w-[360px] grid-cols-2 gap-3">
          <div className="bg-box-gray flex flex-col items-center justify-center gap-2 rounded-md px-5 py-4">
            <span className="text-sm text-gray-500">총 거래 건수</span>
            <span className="text-lg font-bold">{orderCount}건</span>
          </div>
          <div className="bg-box-gray flex flex-col items-center justify-center gap-2 rounded-md px-5 py-4">
            <span className="text-sm text-gray-500">고객사</span>
            <span className="text-lg font-bold">{clientCount}곳</span>
          </div>
        </div>
      </div>
      <div className="bg-box-gray h-[210px] w-full rounded-md p-4">
        <h3 className="font-semibold">[기업 소개]</h3>
        <p className="mt-2 text-sm leading-relaxed whitespace-pre-line">
          {vendorExplanation}
        </p>
      </div>
    </WhiteBox>
  );
}
