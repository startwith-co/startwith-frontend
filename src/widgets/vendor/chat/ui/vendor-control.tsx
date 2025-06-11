'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import RequestPayModal from '@/features/vendorChat/ui/request-pay-modal';
import { useVendorModal } from '@/views/vendor/chat/model/VendorModalProvider';
import ChatUserCard from '@/entities/chat/ui/chat-user-card';

function VendorControl() {
  const { setOpen } = useVendorModal();

  return (
    <div className="flex h-full w-full flex-col gap-2.5 rounded-3xl bg-[#FFFFFF] px-8 pt-[19px] shadow-lg">
      <Avatar className="flex size-20 items-center justify-center self-center rounded-full">
        <AvatarImage src="https://github.com/shadcn.png" />
        {/* 이미지 로드 실패 시 fallback */}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-2.5">
          <p className="text-center text-lg font-semibold">더비즈온</p>
          <ChatUserCard title="제목" content="내용" />
          <ChatUserCard title="제목" content="내용" />
          <ChatUserCard title="제목" content="내용" />
        </div>
        <div className="mb-5 flex flex-col gap-2.5">
          <Button
            asChild={false}
            variant="bgBlueGradient"
            className="h-[50px] w-[90%] self-center text-sm text-white"
            onClick={() => {
              setOpen(true);
            }}
          >
            결제 요청하기
          </Button>
          <RequestPayModal />
        </div>
      </div>
    </div>
  );
}

export default VendorControl;
