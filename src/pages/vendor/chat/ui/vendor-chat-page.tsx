'use client';

import VendorChatRooms from '@/widgets/vendor/chat/ui/vendor-chat-rooms';
import VendorChatting from '@/widgets/vendor/chat/ui/vendor-chatting';
import VendorControl from '@/widgets/vendor/chat/ui/vendor-control';
import VendorRoomIdProvider from '@/pages/vendor/chat/model/VendorRoomIdProvider';

export default function VendorChatPage() {
  return (
    <VendorRoomIdProvider>
      <div className="grid w-full grid-cols-[2fr_4fr_1.5fr] gap-6 pr-8">
        <VendorChatRooms />
        <VendorChatting />
        <VendorControl />
      </div>
    </VendorRoomIdProvider>
  );
}
