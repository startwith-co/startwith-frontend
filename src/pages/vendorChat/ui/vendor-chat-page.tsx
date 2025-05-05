'use client';

import { MdOutlineAttachFile } from 'react-icons/md';
import { IoSearchOutline } from 'react-icons/io5';
import Input from '@/shared/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import VendorChatRoomCard from '@/entities/vendorChat/ui/vendor-chat-room-card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/shared/ui/pagination';
import VendorChatUserCard from '@/entities/vendorChat/ui/vendor-chat-user-card';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import RequestPayModal from '@/features/vendorChat/ui/request-pay-modal';

export default function VendorChatPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid w-full grid-cols-[2fr_4fr_1.5fr] gap-6 pr-8">
      {/* 채팅룸 */}
      <div className="w-full rounded-3xl border-2 border-[#404040] bg-[#212121] p-4.5 pb-8">
        <div className="relative mb-5">
          <Input
            type="search"
            placeholder="실시간 상담 검색"
            className="h-[45px] rounded-2xl border-0 bg-[#3D3D3D] pl-4 placeholder:font-light"
          />
          <IoSearchOutline
            size={20}
            className="absolute top-1/2 right-4 -translate-y-1/2 transform"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <VendorChatRoomCard
            name="더비즈온"
            preview="안녕하세요, 더비즈온입니다."
            img="https://github.com/shadcn.png"
            date="2025-04-30 10:00"
          />
          <VendorChatRoomCard
            name="더비즈온"
            preview="안녕하세요, 더비즈온입니다."
            img="https://github.com/shadcn.png"
            date="2025-04-30 10:00"
          />
          <VendorChatRoomCard
            name="더비즈온"
            preview="안녕하세요, 더비즈온입니다."
            img="https://github.com/shadcn.png"
            date="2025-04-30 10:00"
          />
          <VendorChatRoomCard
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
              <PaginationItem className="bg-[#3D3D3D]">
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem className="bg-[#3D3D3D]">
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem className="bg-[#3D3D3D]">
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* 채팅리스트 */}
      <div className="flex h-full w-full flex-col rounded-3xl border-2 border-[#404040] bg-[#212121] py-4">
        <div className="flex-1">
          {/* TODO: 채팅 메시지 영역 (추후 구현) */}
          <div className="p-4 text-white">채팅 메시지가 여기에 표시됩니다</div>
        </div>
        <div className="relative p-4">
          <Input
            type="search"
            placeholder="메시지 입력"
            className="h-[45px] rounded-3xl border-0 bg-[#3D3D3D] pl-4 text-white placeholder:font-light"
          />
          <MdOutlineAttachFile className="absolute top-1/2 right-16 size-5.5 -translate-y-1/2 transform text-white" />
          <button className="absolute top-1/2 right-7 flex size-[30px] -translate-y-1/2 transform items-center justify-center rounded-full bg-[#212121] p-1 text-center text-white">
            →
          </button>
        </div>
      </div>

      {/* 채팅화면 */}
      <div className="flex h-full w-full flex-col gap-2.5 rounded-3xl border-2 border-[#404040] bg-[#212121] px-8 pt-[19px] shadow-md">
        <Avatar className="flex size-20 items-center justify-center self-center rounded-full">
          <AvatarImage src="https://github.com/shadcn.png" />
          {/* 이미지 로드 실패 시 fallback */}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-2.5">
            <p className="text-center text-lg font-semibold text-white">
              더비즈온
            </p>
            <VendorChatUserCard title="제목" content="내용" />
            <VendorChatUserCard title="제목" content="내용" />
            <VendorChatUserCard title="제목" content="내용" />
          </div>
          <div className="mb-5 flex flex-col gap-2.5">
            <Button
              asChild={false}
              className="h-[40px] w-full bg-black text-sm text-[#5B76FF]"
              onClick={() => setOpen(true)}
            >
              결제 요청하기
            </Button>
            <Button
              asChild={false}
              className="h-[40px] w-full bg-black text-sm text-white"
            >
              개발 완료 알림
            </Button>
            <RequestPayModal open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}
