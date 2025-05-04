import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import formatDate from '@/shared/lib/date-formatter';

function VendorChatRoomCard({
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
    <div className="flex items-center justify-center rounded-md bg-[#3D3D3D] p-3.5">
      <Avatar className="mr-6 flex size-15 rounded-full">
        <AvatarImage src={img} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-[#FFFFFF]">{name}</p>
          <p className="text-xs font-light text-[#AAAAAA]">
            {formatDate(date)}
          </p>
        </div>
        <p className="text-sm text-[#AAAAAA]">{preview}</p>
      </div>
    </div>
  );
}

export default VendorChatRoomCard;
