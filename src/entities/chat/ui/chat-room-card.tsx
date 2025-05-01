import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import formatDate from '@/shared/lib/date-formatter';

function ChatRoomCard({
  name,
  preview,
  img,
  date,
}: {
  name: string;
  preview: string;
  img: string;
  date: string;
}) {
  return (
    <div className="flex items-center justify-center rounded-md bg-gray-100 p-3.5">
      <Avatar className="mr-6 flex size-15 rounded-full">
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

export default ChatRoomCard;
