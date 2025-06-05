import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import clsx from 'clsx';
import Link from 'next/link';

export interface ChatRoomCardProps {
  name: string;
  lastMessage: string;
  img: string;
  link: string;
  className?: string;
  avatarSize?: string;
  updatedDate?: string;
}

export default function ChatRoomCard({
  name,
  lastMessage,
  img,
  link,
  className = '',
  avatarSize = 'size-15',
  updatedDate,
}: ChatRoomCardProps) {
  return (
    <Link href={link}>
      <div
        className={clsx(
          'flex items-center justify-center rounded-lg bg-[#F5F5F5] px-1 py-2.5',
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
          <span className="truncate text-sm">{lastMessage}</span>
        </div>
      </div>
    </Link>
  );
}
