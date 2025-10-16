'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from '@/shared/lib/utils';

interface Route {
  label: string;
  href: string;
}

interface RouteActiveLinkProps {
  routes: Route[];
}

function VendorRouteSide({ routes }: RouteActiveLinkProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'mb-5 block text-sm font-semibold text-white',
            isActive(route.href) && 'font-extrabold',
          )}
        >
          {route.label}
        </Link>
      ))}
    </>
  );
}

export default VendorRouteSide;
