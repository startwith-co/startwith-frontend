'use client';

import useGetChatRooms from '@/shared/model/useGetChatRooms';
import DarkBox from '@/shared/ui/dark-box';

export default function VendorChatWidget() {
  const rooms = useGetChatRooms({ targetId: 'vendorId' });
  return (
    <div className="rounded-2xl bg-white p-7 shadow-md">
      <h2 className="font-semibold 2xl:text-xl">실시간 상담 현황</h2>
      <ul className="mt-5 flex flex-col gap-5">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <li key={room.roomId}>
              <DarkBox className="w-full py-7 text-center text-xs font-semibold">
                {room.consumerName}
              </DarkBox>
            </li>
          ))
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
