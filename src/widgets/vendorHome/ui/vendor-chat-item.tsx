import Link from 'next/link';
import DarkBox from '@/shared/ui/dark-box';
import useLastMessage from '@/shared/model/useLastMessage';
import useChatDataLoad from '@/shared/model/useChaDataLoad';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

function VendorChatItem({
  room,
}: {
  room: {
    roomId: string;
    vendorSeq: string;
    consumerSeq: string;
    solutionName: string;
    consumerName: string;
  };
}) {
  const lastMessage = useLastMessage(room.roomId);
  const { img } = useChatDataLoad({
    role: 'vendor',
    vendorSeq: room.vendorSeq,
    consumerSeq: room.consumerSeq,
  });
  return (
    <li key={room.roomId}>
      <Link
        href={`vendor/chat?vendorId=${room.vendorSeq}&consumerId=${room.consumerSeq}`}
      >
        <DarkBox className="flex h-17.5 w-full items-center px-2 text-center text-xs font-semibold">
          <Avatar className="mr-3 size-10 flex-shrink-0 rounded-full bg-[#D9D9D9]">
            <AvatarImage src={img || '/images/default-profile.svg'} />
            <AvatarFallback>{room.consumerName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex h-10 flex-col items-start justify-between">
            <p className="max-w-[100px] truncate text-xs">
              {lastMessage?.message}
            </p>
            <span className="text-vendor-secondary text-[10px]">
              {room.consumerName}
            </span>
          </div>
        </DarkBox>
      </Link>
    </li>
  );
}

export default VendorChatItem;
