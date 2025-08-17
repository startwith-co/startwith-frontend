'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import VendorProfileSideHeader from '@/entities/my/ui/vendor-profile-side';
import { VendorInfoProps } from '@/views/vendorMy/model/type';
import cn from '@/shared/lib/utils';
import api from '@/shared/api/index-api';
import { ApiResponse } from '@/shared/model/apiType';
import useDynamicRoute from '@/shared/model/useDynamicRoute';

interface Route {
  label: string;
  href: string;
}

interface VendorProfileSideProps {
  routes: Route[];
  id: number;
}

export default function VendorProfileSide({
  routes,
  id,
}: VendorProfileSideProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const dynamicRoute = useDynamicRoute();

  const [vendorInfo, setVendorInfo] = useState<VendorInfoProps>();

  useEffect(() => {
    const fetchVendorInfo = async () => {
      const res = await api
        .get<
          ApiResponse<VendorInfoProps>
        >(`api/b2b-service/vendor?vendorSeq=${id}`)
        .json();
      setVendorInfo(res.data);
    };
    fetchVendorInfo();
  }, [id]);

  return (
    <aside className="bg-vendor-primary .5 relative mr-3 ml-3 flex h-[650px] flex-col items-center rounded-2xl px-6 py-9 shadow-md">
      <VendorProfileSideHeader audit={vendorInfo?.audit || false} />

      <Avatar className="mb-2.5 flex size-30 rounded-full">
        <AvatarImage
          src={
            vendorInfo?.vendorBannerImageUrl || '/images/default-profile.svg'
          }
        />
        <AvatarFallback>스타트윗</AvatarFallback>
      </Avatar>
      <h1 className="mb-14.5 text-lg font-semibold text-white">
        {vendorInfo?.vendorName}
      </h1>

      {routes.slice(0, 2).map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'mb-5 text-sm font-semibold text-white',
            isActive(route.href) && 'font-extrabold',
          )}
        >
          {route.label}
        </Link>
      ))}

      {dynamicRoute && (
        <Link
          key={dynamicRoute.href}
          href={dynamicRoute.href}
          className={cn(
            'mb-5 text-sm font-semibold text-white',
            isActive(dynamicRoute.href) && 'font-extrabold',
          )}
        >
          {dynamicRoute.label}
        </Link>
      )}

      {routes.slice(2).map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'mb-5 text-sm font-semibold text-white',
            isActive(route.href) && 'font-extrabold',
          )}
        >
          {route.label}
        </Link>
      ))}
    </aside>
  );
}
