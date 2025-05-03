'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

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

  return (
    <aside
      className={`mr-5 flex h-auto w-[220px] flex-col items-center rounded-2xl p-2 pt-20 ${mode === 'user' ? 'bg-white' : 'border-2 border-[#404040] bg-[#212121]'} shadow-md`}
    >
      <Avatar className="mb-2 flex size-30 rounded-full">
        <AvatarImage src="/image/image.png" />
        <AvatarFallback>스타트윗</AvatarFallback>
      </Avatar>
      <h1
        className={`mb-5 text-2xl font-bold ${mode === 'user' ? 'text-[#000000]' : 'text-white'}`}
      >
        {companyName}
      </h1>

      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`mb-5 ${isActive(route.href) ? 'text-md font-bold' : 'text-sm font-semibold'} ${mode === 'user' ? 'text-[#000000]' : 'text-white'}`}
        >
          {route.label}
        </Link>
      ))}
    </aside>
  );
}

export default ProfileSide;
