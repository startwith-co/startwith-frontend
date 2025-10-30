'use client';

import ChatUserCard from '@/entities/chat/ui/chat-user-card';
import { solutionCategoryToLabel } from '@/shared/model/getCategoryList';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import useFetchVendor from '@/widgets/user/chat/model/useFetchVendor';

function formatTimeRange(start: string | null, end: string | null) {
  if (!start || !end) return '';
  const [sh, sm] = start.split(':');
  const [eh, em] = end.split(':');
  return `${sh.padStart(2, '0')}:${sm.padStart(2, '0')}~${eh.padStart(2, '0')}:${em.padStart(2, '0')}`;
}

function ChatCompanyProfile() {
  const vendorInfo = useFetchVendor();
  console.log(vendorInfo);

  return (
    <div className="flex h-full w-full flex-col gap-2.5 rounded-3xl bg-white px-8 pt-[19px] shadow-md">
      <Avatar className="flex size-20 items-center justify-center self-center rounded-full">
        <AvatarImage
          src={
            vendorInfo?.vendorInfo?.profileImage ||
            '/images/default-profile.svg'
          }
        />
        <AvatarFallback>{vendorInfo?.vendorInfo?.vendorName}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2.5">
        <p className="text-center text-lg font-semibold">
          {vendorInfo?.vendorInfo?.vendorName}
        </p>
        <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 p-2.5 text-sm">
          <p className="text-gray-500">상담 가능 시간</p>
          {vendorInfo?.vendorInfo && (
            <>
              <p className="text-xs text-black">
                {vendorInfo.vendorInfo.weekdayAvailable
                  ? `평일 : ${formatTimeRange(
                      vendorInfo.vendorInfo.weekdayStartTime ?? '',
                      vendorInfo.vendorInfo.weekdayEndTime ?? '',
                    )}`
                  : '평일 : 불가'}
              </p>
              <p className="text-xs text-black">
                {vendorInfo?.vendorInfo?.weekendAvailable
                  ? `주말 : ${formatTimeRange(
                      vendorInfo.vendorInfo.weekendStartTime ?? '',
                      vendorInfo.vendorInfo.weekendEndTime ?? '',
                    )}`
                  : '주말 : 불가'}
              </p>
              <p className="text-xs text-black">
                {vendorInfo?.vendorInfo?.holidayAvailable
                  ? `공휴일 : ${formatTimeRange(
                      vendorInfo.vendorInfo.holidayStartTime ?? '',
                      vendorInfo.vendorInfo.holidayEndTime ?? '',
                    )}`
                  : '공휴일 : 불가'}
              </p>
            </>
          )}
        </div>
        <ChatUserCard title="서비스 만족도" content="100%" />
        <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 p-2.5 text-sm">
          <p className="text-gray-500">솔루션 카테고리</p>
          <p className="text-center text-xs whitespace-pre-wrap text-black">
            {vendorInfo?.vendorCategory
              ?.map(
                (category) =>
                  solutionCategoryToLabel[category.category] ??
                  category.category,
              )
              .join(' ')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatCompanyProfile;
