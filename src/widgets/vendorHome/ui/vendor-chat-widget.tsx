'use client';

import useGetChatRooms from '@/shared/model/useGetChatRooms';
import DarkBox from '@/shared/ui/dark-box';
import Image from 'next/image';
import Link from 'next/link';
import defaultImage from 'public/images/dummy.png';

export default function VendorChatWidget() {
  const rooms = useGetChatRooms({ targetId: 'vendorSeq' });
  return (
    <div className="rounded-2xl bg-white p-7 shadow-md">
      <h2 className="font-semibold 2xl:text-xl">실시간 상담 현황</h2>
      <ul className="mt-5 flex flex-col gap-5">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <li key={room.roomId}>
              <Link
                href={`vendor/chat?vendorId=${room.vendorSeq}&consumerId=${room.consumerSeq}`}
              >
                <DarkBox className="flex h-17.5 w-full items-center px-2 text-center text-xs font-semibold">
                  <Image
                    src={room.userImg || defaultImage}
                    alt="image"
                    width={50}
                    height={50}
                    className="mr-2 size-10 rounded-full object-cover object-center"
                  />
                  <div className="flex h-10 flex-col items-start justify-between">
                    <p className="max-w-[100px] truncate text-xs">
                      {room.solutionName}
                    </p>
                    <span className="text-vendor-secondary text-[10px]">
                      {room.consumerName}
                    </span>
                  </div>
                </DarkBox>
              </Link>
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
