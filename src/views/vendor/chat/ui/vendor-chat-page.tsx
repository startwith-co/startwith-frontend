'use client';

import VendorChatRooms from '@/widgets/vendor/chat/ui/vendor-chat-rooms';
import VendorChatting from '@/widgets/vendor/chat/ui/vendor-chatting';
import VendorControl from '@/widgets/vendor/chat/ui/vendor-control';
import VendorModalProvider from '@/views/vendor/chat/model/VendorModalProvider';
import RoomIdProvider from '@/shared/model/RoomIdProvider';
import ChattingMainWrapper from '@/shared/ui/chatting-main-wrapper';
import SolutionProvider from '@/shared/model/SolutionProvider';

export default function VendorChatPage() {
  return (
    <ChattingMainWrapper>
      <SolutionProvider>
        <RoomIdProvider>
          <VendorModalProvider>
            <div className="grid w-full grid-cols-[2fr_4fr_1.5fr] gap-6 pr-8">
              <VendorChatRooms />
              <VendorChatting />
              <VendorControl />
            </div>
          </VendorModalProvider>
        </RoomIdProvider>
      </SolutionProvider>
    </ChattingMainWrapper>
  );
}
