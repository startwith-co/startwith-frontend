'use client';

import ChatRoomCard from '@/entities/chat/ui/chat-room-card';
import Input from '@/shared/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/shared/ui/pagination';
import { IoSearchOutline } from 'react-icons/io5';
import useGetChatRooms from '@/shared/model/useGetChatRooms';
import formatMainDate from '@/shared/lib/chat-main-date-format';

function ChatRooms() {
  const rooms = useGetChatRooms({ targetId: 'consumerId' });

  return (
    <div className="w-full min-w-0 rounded-3xl bg-white p-4.5 pb-8 shadow-md">
      <div className="relative mb-5">
        <Input
          type="search"
          placeholder="실시간 상담 검색"
          className="h-[45px] rounded-3xl pl-4 placeholder:font-light"
        />
        <IoSearchOutline
          size={20}
          className="absolute top-1/2 right-4 -translate-y-1/2 transform"
        />
      </div>
      <div className="flex flex-col gap-2.5">
        {rooms.map((room) => (
          <ChatRoomCard
            consumerId={room.consumerId}
            vendorId={room.vendorId}
            consumerName={room.consumerName}
            vendorName={room.vendorName}
            vendorSeq={room.vendorSeq}
            key={room.roomId}
            name={room.lastMessage.messageName}
            updatedDate={formatMainDate(room.lastMessage.updatedAt)}
            lastMessage={room.lastMessage.message}
            img={room.vendorId || ''}
            link={`/chat?consumerId=${room.consumerId}&vendorId=${room.vendorId}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {/* TODO: Link형태로 되어있어서 추후 일반 버튼으로 수정해야 함. */}
        <Pagination className="mt-6">
          <PaginationContent className="flex gap-2.5">
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default ChatRooms;
