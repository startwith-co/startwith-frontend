'use client';

import { useRouter } from 'next/navigation';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import api from '@/shared/api/client-api';
import { ApiResponse } from '@/shared/model/apiType';
import {
  ConsumerInfoProps,
  VendorInfoProps,
} from '@/views/vendorMy/model/type';
import useLastMessage from '@/shared/model/useLastMessage';
import formatMainDate from '@/shared/lib/chat-main-date-format';

export interface ChatRoomCardProps {
  roomId: string;
  link: string;
  className?: string;
  avatarSize?: string;
  consumerName: string;
  vendorName: string;
  vendorSeq: string;
  consumerSeq: string;
  role?: string;
}
export default function ChatRoomCard({
  roomId,
  link,
  className = '',
  avatarSize = 'size-15',
  consumerName,
  vendorName,
  vendorSeq,
  consumerSeq,
  role,
}: ChatRoomCardProps) {
  const router = useRouter();
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const lastMessage = useLastMessage(roomId);

  useEffect(() => {
    const getData = async () => {
      if (role === 'consumer') {
        const data = await api
          .get<
            ApiResponse<VendorInfoProps>
          >(`api/b2b-service/vendor?vendorSeq=${vendorSeq}`)
          .json();
        setImg(data?.data?.profileImage || '/images/default-profile.svg');
        setName(data?.data?.vendorName || 'user');
      } else {
        const data = await api
          .get<
            ApiResponse<ConsumerInfoProps>
          >(`api/b2b-service/consumer?consumerSeq=${consumerSeq}`)
          .json();
        setImg(data?.data?.consumerImageUrl || '/images/default-profile.svg');
        setName(data?.data?.consumerName || 'user');
      }
    };
    getData();
  }, [vendorSeq, consumerSeq, role]);

  const { setChatMeta } = useChatMeta();

  const handleClick = () => {
    setChatMeta({
      consumerName,
      vendorName,
      vendorSeq,
      consumerSeq,
    });
    router.push(link);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleClick}
      className={clsx(
        'flex cursor-pointer items-center justify-center rounded-lg bg-[#F5F5F5] px-1 py-2.5',
        className,
      )}
    >
      <Avatar
        className={clsx('mr-3 flex rounded-full bg-[#D9D9D9]', avatarSize)}
      >
        <AvatarImage src={img || '/images/default-profile.svg'} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex w-full items-center gap-x-8">
          <span className="truncate font-semibold">{name}</span>
          <span className="truncate text-xs font-light text-[#A7A7A7]">
            {formatMainDate(lastMessage?.createdAt)}
          </span>
        </div>
        <span className="truncate text-sm">{lastMessage?.message}</span>
      </div>
    </div>
  );
}
