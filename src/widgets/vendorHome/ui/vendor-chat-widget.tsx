'use client';

import useGetChatRooms from '@/shared/model/useGetChatRooms';
import DarkBox from '@/shared/ui/dark-box';
import { useSession } from 'next-auth/react';
import VendorChatItem from './vendor-chat-item';

export default function VendorChatWidget() {
  const { data: session } = useSession();
  const rooms = useGetChatRooms({
    targetId: 'vendorSeq',
    defaultId: session?.vendorSeq?.toString(),
  });
  return (
    <div className="rounded-2xl bg-white p-7 shadow-md">
      <h2 className="font-semibold 2xl:text-xl">실시간 상담 현황</h2>
      <ul className="mt-5 flex flex-col gap-5">
        {rooms.length > 0 ? (
          rooms.map((room) => <VendorChatItem key={room.roomId} room={room} />)
        ) : (
          <li>
            <DarkBox className="w-full py-7 text-center text-xs font-semibold">
              실시간 상담 없음
            </DarkBox>
          </li>
        )}
      </ul>
    </div>
  );
}
