'use client';

import Input from '@/shared/ui/input';
import { IoSearchOutline } from 'react-icons/io5';
import useGetChatRooms from '@/shared/model/useGetChatRooms';
import ChatPagination from '@/shared/ui/chat-pagination';

function VendorChatRooms() {
  const rooms = useGetChatRooms({ targetId: 'vendorId' });
  return (
    <div className="w-full min-w-0 rounded-3xl bg-[#FFFFFF] p-4.5 pb-8 shadow-lg">
      <div className="relative mb-5">
        <Input
          type="search"
          placeholder="실시간 상담 검색"
          className="h-[45px] rounded-2xl border-0 bg-[#F5F5F5] pl-4 placeholder:font-light"
        />
        <IoSearchOutline
          size={20}
          className="absolute top-1/2 right-4 -translate-y-1/2 transform"
        />
      </div>
      <ChatPagination rooms={rooms} />
    </div>
  );
}

export default VendorChatRooms;
