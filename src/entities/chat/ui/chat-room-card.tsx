import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import clsx from 'clsx';
import Link from 'next/link';

export interface ChatRoomCardProps {
  name: string;
  lastMessage: string;
  img: string;
  date: string;
  link: string;
  className?: string;
  avatarSize?: string;
}

export default function ChatRoomCard({
  name,
  lastMessage,
  img,
  date,
  link,
  className = '',
  avatarSize = 'size-15',
}: ChatRoomCardProps) {
  return (
    <Link href={link}>
      <div
        className={clsx(
          'flex items-center justify-center rounded-md p-3.5',
          className,
        )}
      >
        <Avatar className={clsx('mr-6 flex rounded-full', avatarSize)}>
          <AvatarImage src={img} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="truncate font-semibold">{name}</p>
            <p className="text-xs font-light text-gray-500">{date}</p>
          </div>
          <p className="truncate text-sm">{lastMessage}</p>
        </div>
      </div>
    </Link>
  );
}
