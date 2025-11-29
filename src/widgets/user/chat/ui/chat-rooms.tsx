'use client';

import Input from '@/shared/ui/input';
import { IoSearchOutline } from 'react-icons/io5';

import useGetChatRooms from '@/shared/model/useGetChatRooms';
import ChatPagination from '@/shared/ui/chat-pagination';
import { useRef, useState } from 'react';

function ChatRooms() {
  const rooms = useGetChatRooms({ targetId: 'consumerSeq' });
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');

  const handleSearchSubmit = () => {
    const value = inputRef.current?.value ?? '';
    setSearch(value);
  };

  return (
    <div className="w-full min-w-0 rounded-3xl bg-white p-4.5 pb-8 shadow-md">
      <div className="relative mb-5">
        <Input
          type="search"
          placeholder="실시간 상담 검색"
          className="h-[45px] rounded-3xl pl-4 placeholder:font-light"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearchSubmit();
          }}
        />
        <IoSearchOutline
          size={20}
          className="absolute top-1/2 right-4 -translate-y-1/2 transform"
          onClick={handleSearchSubmit}
        />
      </div>

      <ChatPagination rooms={rooms} search={search} />
    </div>
  );
}

export default ChatRooms;
