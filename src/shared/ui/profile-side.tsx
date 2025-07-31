'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import VendorProfileSide from '@/entities/my/ui/vendor-profile-side';
import cn from '../lib/utils';
import useDynamicRoute from '../model/useDynamicRoute';

interface Route {
  label: string;
  href: string;
}

interface ProfileSideProps {
  routes: Route[];
  companyName: string;
  mode?: 'vendor' | 'user';
}

function ProfileSide({ routes, companyName, mode = 'user' }: ProfileSideProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const dynamicRoute = useDynamicRoute();

  return (
    // TODO: 사이드바 높이 수정
    <aside
      className={cn(
        'mr-7.5 flex max-h-[580px] min-w-[200px] flex-col items-center rounded-r-2xl px-3.5 py-9 shadow-md',
        mode === 'user'
          ? 'h-[400px] bg-white'
          : 'bg-vendor-primary relative h-auto',
      )}
    >
      {mode === 'vendor' && <VendorProfileSide />}

      <Avatar className="mb-2.5 flex size-30 rounded-full">
        <AvatarImage src="/image/image.png" />
        <AvatarFallback>스타트윗</AvatarFallback>
      </Avatar>
      <h1
        className={cn(
          'mb-14.5 text-lg font-bold',
          mode === 'user' ? 'text-[#000000]' : 'text-white',
        )}
      >
        {companyName}
      </h1>

      <Link
        key={routes[0].href}
        href={routes[0].href}
        className={cn(
          'mb-5',
          isActive(routes[0].href)
            ? 'text-md font-bold'
            : 'text-sm font-semibold',
          mode === 'user' ? 'text-[#000000]' : 'text-white',
        )}
      >
        {routes[0].label}
      </Link>

      {mode === 'vendor' && dynamicRoute && (
        <Link
          key={dynamicRoute?.href}
          href={dynamicRoute?.href}
          className={cn(
            'mb-5',
            'text-white',
            isActive(dynamicRoute?.href)
              ? 'text-md font-bold'
              : 'text-sm font-semibold',
          )}
        >
          {dynamicRoute?.label}
        </Link>
      )}
      {routes.slice(1).map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'mb-5',
            isActive(route.href)
              ? 'text-md font-bold'
              : 'text-sm font-semibold',
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
