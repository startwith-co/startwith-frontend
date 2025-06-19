'use client';

import { useRouter } from 'next/navigation';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import clsx from 'clsx';
import renderLastMessage from '../lib/renderLastMessage';

export interface ChatRoomCardProps {
  name: string;
  lastMessage: string;
  img: string;
  link: string;
  className?: string;
  avatarSize?: string;
  updatedDate?: string;
  consumerId: string;
  vendorId: string;
  consumerName: string;
  vendorName: string;
  vendorSeq: string;
}
export default function ChatRoomCard({
  name,
  lastMessage,
  img,
  link,
  className = '',
  avatarSize = 'size-15',
  updatedDate,
  consumerId,
  vendorId,
  consumerName,
  vendorName,
  vendorSeq,
}: ChatRoomCardProps) {
  const router = useRouter();
  const { setChatMeta } = useChatMeta();

  const handleClick = () => {
    setChatMeta({
      consumerId,
      vendorId,
      consumerName,
      vendorName,
      vendorSeq: Number(vendorSeq),
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
        <AvatarImage src={img} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex w-full items-center gap-x-8">
          <span className="truncate font-semibold">{name}</span>
          <span className="truncate text-xs font-light text-[#A7A7A7]">
            {updatedDate}
          </span>
        </div>
        <span className="truncate text-sm">
          {renderLastMessage(lastMessage)}
        </span>
      </div>
    </div>
  );
}
