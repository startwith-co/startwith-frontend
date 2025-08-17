'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import cn from '@/shared/lib/utils';
import api from '@/shared/api/index-api';
import { ApiResponse } from '@/shared/model/apiType';
import { ConsumerInfoProps } from '@/views/vendorMy/model/type';

interface Route {
  label: string;
  href: string;
}

interface ConsumerProfileSideProps {
  routes: Route[];
  id: number;
}

export default function ConsumerProfileSide({
  routes,
  id,
}: ConsumerProfileSideProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const [userInfo, setUserInfo] = useState<ConsumerInfoProps>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await api
        .get<
          ApiResponse<ConsumerInfoProps>
        >(`api/b2b-service/consumer?consumerSeq=${id}`)
        .json();
      setUserInfo(res.data);
    };
    fetchUserInfo();
  }, [id]);

  return (
    <aside className="mr-7.5 flex h-[400px] flex-col items-center rounded-2xl bg-white px-3.5 py-9 shadow-md">
      <Avatar className="mb-2.5 flex size-30 rounded-full">
        <AvatarImage
          src={userInfo?.consumerImageUrl || '/images/default-profile.svg'}
        />
        <AvatarFallback>스타트윗</AvatarFallback>
      </Avatar>
      <h1 className="mb-14.5 text-lg font-semibold text-[#000000]">
        {userInfo?.consumerName}
      </h1>

      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'mb-5 text-sm font-semibold text-[#000000]',
            isActive(route.href) && 'font-extrabold',
          )}
        >
          {route.label}
        </Link>
      ))}
    </aside>
  );
}
