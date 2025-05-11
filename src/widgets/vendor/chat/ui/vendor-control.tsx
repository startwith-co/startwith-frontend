'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import VendorChatUserCard from '@/entities/vendorChat/ui/vendor-chat-user-card';
import { Button } from '@/shared/ui/button';
import RequestPayModal from '@/features/vendorChat/ui/request-pay-modal';
import { useVendorRoomId } from '@/pages/vendor/chat/model/VendorRoomIdProvider';

function VendorControl() {
  const { setOpen } = useVendorRoomId();

  return (
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
            onClick={() => {
              setOpen(true);
            }}
          >
            결제 요청하기
          </Button>
          <Button
            asChild={false}
            className="h-[40px] w-full bg-black text-sm text-white"
          >
            개발 완료 알림
          </Button>
          <RequestPayModal />
        </div>
      </div>
    </div>
  );
}

export default VendorControl;
