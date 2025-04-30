import { MdOutlineAttachFile } from 'react-icons/md';
import { IoSearchOutline } from 'react-icons/io5';
import Input from '@/shared/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import ChatUserCard from '@/entities/chat/ui/chat-user-card';
import ChatRoomCard from '@/entities/chat/ui/chat-room-card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/shared/ui/pagination';

export default function ChatPage() {
  return (
    <div className="mt-[90px] grid grid-cols-[2fr_4fr_1.5fr] gap-6">
      {/* 채팅룸 */}
      <div className="w-full rounded-3xl bg-white p-4.5 pb-8 shadow-md">
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
          <ChatRoomCard
            name="더비즈온"
            preview="안녕하세요, 더비즈온입니다."
            img="https://github.com/shadcn.png"
            date="2025-04-30 10:00"
          />
          <ChatRoomCard
            name="더비즈온"
            preview="안녕하세요, 더비즈온입니다."
            img="https://github.com/shadcn.png"
            date="2025-04-30 10:00"
          />
          <ChatRoomCard
            name="더비즈온"
            preview="안녕하세요, 더비즈온입니다."
            img="https://github.com/shadcn.png"
            date="2025-04-30 10:00"
          />
          <ChatRoomCard
            name="더비즈온"
            preview="안녕하세요, 더비즈온입니다."
            img="https://github.com/shadcn.png"
            date="2025-04-30 10:00"
          />
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

      {/* 채팅리스트 */}
      <div className="flex h-full w-full flex-col rounded-3xl bg-white py-4 shadow-md">
        <div className="flex-1">
          {/* TODO: 채팅 메시지 영역 (추후 구현) */}
          <div className="p-4">채팅 메시지가 여기에 표시됩니다</div>
        </div>
        <div className="relative p-4">
          <Input
            type="search"
            placeholder="메시지 입력"
            className="h-[45px] rounded-3xl pl-4 placeholder:font-light"
          />
          <MdOutlineAttachFile className="absolute top-1/2 right-16 size-5.5 -translate-y-1/2 transform" />
          <button className="bg-primary absolute top-1/2 right-7 flex size-[30px] -translate-y-1/2 transform items-center justify-center rounded-full p-1 text-center text-white">
            →
          </button>
        </div>
      </div>

      {/* 채팅화면 */}
      <div className="flex h-full w-full flex-col gap-2.5 rounded-3xl bg-white px-8 pt-[19px] shadow-md">
        <Avatar className="flex size-20 items-center justify-center self-center rounded-full">
          <AvatarImage src="https://github.com/shadcn.png" />
          {/* 이미지 로드 실패 시 fallback */}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2.5">
          <p className="text-center text-lg font-semibold">더비즈온</p>
          <ChatUserCard title="제목" content="내용" />
          <ChatUserCard title="제목" content="내용" />
          <ChatUserCard title="제목" content="내용" />
        </div>
      </div>
    </div>
  );
}
