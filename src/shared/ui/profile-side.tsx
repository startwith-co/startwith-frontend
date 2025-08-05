'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import VendorProfileSide from '@/entities/my/ui/vendor-profile-side';
import {
  ConsumerInfoProps,
  VendorInfoProps,
} from '@/views/vendorMy/model/type';
import cn from '../lib/utils';
import useDynamicRoute from '../model/useDynamicRoute';
import api from '../api/index-api';
import { ApiResponse } from '../model/apiType';

interface Route {
  label: string;
  href: string;
}

interface ProfileSideProps {
  routes: Route[];
  mode?: 'vendor' | 'user';
  id: number;
}

function ProfileSide({ routes, mode = 'user', id }: ProfileSideProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const dynamicRoute = useDynamicRoute();

  const [vendorInfo, setVendorInfo] = useState<VendorInfoProps>();
  const [userInfo, setUserInfo] = useState<ConsumerInfoProps>();

  useEffect(() => {
    if (mode === 'vendor') {
      const fetchVendorInfo = async () => {
        const res = await api
          .get<
            ApiResponse<VendorInfoProps>
          >(`api/b2b-service/vendor?vendorSeq=${id}`)
          .json();
        setVendorInfo(res.data);
      };
      fetchVendorInfo();
    } else {
      const fetchUserInfo = async () => {
        const res = await api
          .get<
            ApiResponse<ConsumerInfoProps>
          >(`api/b2b-service/consumer?consumerSeq=${id}`)
          .json();
        setUserInfo(res.data);
      };
      fetchUserInfo();
    }
  }, []);

  return (
    // TODO: 사이드바 높이 수정
    <aside
      className={cn(
        'mr-7.5 flex max-h-[580px] min-w-[200px] flex-col items-center rounded-2xl px-3.5 py-9 shadow-md',
        mode === 'user'
          ? 'h-[400px] bg-white'
          : 'bg-vendor-primary relative h-auto',
      )}
    >
      {mode === 'vendor' && (
        <VendorProfileSide audit={vendorInfo?.audit || false} />
      )}

      <Avatar className="mb-2.5 flex size-30 rounded-full">
        <AvatarImage
          src={
            vendorInfo?.vendorBannerImageUrl || userInfo?.consumerImageUrl || ''
          }
        />
        <AvatarFallback>스타트윗</AvatarFallback>
      </Avatar>
      <h1
        className={cn(
          'mb-14.5 text-lg font-semibold',
          mode === 'user' ? 'text-[#000000]' : 'text-white',
        )}
      >
        {userInfo?.consumerName}
      </h1>
      {routes.slice(0, 2).map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'mb-5 text-sm font-semibold',
            isActive(route.href) ? 'font-extrabold' : '',
            mode === 'user' ? 'text-[#000000]' : 'text-white',
          )}
        >
          {route.label}
        </Link>
      ))}

      {mode === 'vendor' && dynamicRoute && (
        <Link
          key={dynamicRoute?.href}
          href={dynamicRoute?.href}
          className={cn(
            'mb-5 text-sm font-semibold',
            'text-white',
            isActive(dynamicRoute?.href) ? 'font-extrabold' : '',
          )}
        >
          {dynamicRoute?.label}
        </Link>
      )}
      {routes.slice(2).map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'mb-5 text-sm font-semibold',
            isActive(route.href) ? 'font-extrabold' : '',
            mode === 'user' ? 'text-[#000000]' : 'text-white',
          )}
        >
          {route.label}
        </Link>
      ))}
    </aside>
  );
}

export default ProfileSide;
