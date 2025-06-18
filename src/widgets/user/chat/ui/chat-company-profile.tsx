'use client';

import ChatUserCard from '@/entities/chat/ui/chat-user-card';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import api from '@/shared/api/index-api';
import { useEffect, useState } from 'react';
import { VendorInfoProps } from '@/views/vendorMy/model/type';
import { ApiResponse } from '@/shared/model/apiType';

function formatTimeRange(start: any, end: any) {
  if (!start || !end) return '';
  return `${start.hour.toString().padStart(2, '0')}:${start.minute
    .toString()
    .padStart(2, '0')}~${end.hour.toString().padStart(2, '0')}:${end.minute
    .toString()
    .padStart(2, '0')}`;
}

function ChatCompanyProfile() {
  const { vendorSeq } = useChatMeta();
  const [vendorInfo, setVendorInfo] = useState<VendorInfoProps | null>(null);

  useEffect(() => {
    if (!vendorSeq) return;
    const fetchVendorInfo = async () => {
      const info: ApiResponse<VendorInfoProps> = await api
        .get(`api/b2b-service/vendor?vendorSeq=${String(vendorSeq)}`)
        .json();
      setVendorInfo(info.data);
    };
    fetchVendorInfo();
  }, [vendorSeq]);

  return (
    <div className="flex h-full w-full flex-col gap-2.5 rounded-3xl bg-white px-8 pt-[19px] shadow-md">
      <Avatar className="flex size-20 items-center justify-center self-center rounded-full">
        <AvatarImage src={vendorInfo?.vendorBannerImageUrl ?? ''} />
        <AvatarFallback>{vendorInfo?.vendorName?.[0] ?? 'V'}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2.5">
        <p className="text-center text-lg font-semibold">
          {vendorInfo?.vendorName}
        </p>
        <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 p-2.5 text-sm">
          <p className="text-gray-500">상담 가능 시간</p>
          <p className="text-xs">
            {vendorInfo?.weekdayAvailable
              ? `평일 : ${formatTimeRange(
                  vendorInfo.weekdayStartTime,
                  vendorInfo.weekdayEndTime,
                )}`
              : '평일 : 불가'}
          </p>
          <p className="text-xs">
            {vendorInfo?.weekendAvailable
              ? `주말 : ${formatTimeRange(
                  vendorInfo.weekendStartTime,
                  vendorInfo.weekendEndTime,
                )}`
              : '주말 : 불가'}
          </p>
          <p className="text-xs">
            {vendorInfo?.holidayAvailable
              ? `공휴일 : ${formatTimeRange(
                  vendorInfo.holidayStartTime,
                  vendorInfo.holidayEndTime,
                )}`
              : '공휴일 : 불가'}
          </p>
        </div>
        <ChatUserCard
          title="전화번호"
          content={vendorInfo?.phoneNumber ?? ''}
        />
        <ChatUserCard title="이메일" content={vendorInfo?.email ?? ''} />
      </div>
    </div>
  );
}

export default ChatCompanyProfile;
