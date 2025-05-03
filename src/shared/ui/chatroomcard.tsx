import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import formatDate from '@/shared/lib/date-formatter';
import clsx from 'clsx';

export interface ChatRoomCardProps {
  name: string;
  preview: string;
  img: string;
  date: string;
  className?: string;
  avatarSize?: string;
}

export default function ChatRoomCard({
  name,
  preview,
  img,
  date,
  className = '',
  avatarSize = 'size-15',
}: ChatRoomCardProps) {
  return (
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
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{name}</p>
          <p className="text-xs font-light text-gray-500">{formatDate(date)}</p>
        </div>
        <p className="text-sm">{preview}</p>
      </div>
    </div>
  );
}
