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
      className={`mr-5 flex w-[200px] flex-col items-center rounded-r-2xl px-3.5 py-9 ${mode === 'user' ? 'h-[400px] bg-white' : 'h-[567px] border-2 border-l-0 border-[#404040] bg-[#212121]'} shadow-md`}
    >
      <div className="mb-4 flex items-center gap-2.5 rounded-3xl border-2 border-[#404040] px-2.5 py-1.5">
        <div className="flex items-center gap-1.5">
          <div className="size-3.5 rounded-full bg-orange-500" />
          <span className="text-[13px] text-[#AAAAAA]">입점 심사중</span>
        </div>
        {/* TODO: 모달 구현하기 */}
        <div className="flex size-3.5 items-center justify-center rounded-full bg-[#404040]">
          <span className="text-[13px] text-white">?</span>
        </div>
      </div>
      <Avatar className="mb-2.5 flex size-30 rounded-full">
        <AvatarImage src="/image/image.png" />
        <AvatarFallback>스타트윗</AvatarFallback>
      </Avatar>
      <h1
        className={`mb-14.5 text-2xl font-bold ${mode === 'user' ? 'text-[#000000]' : 'text-white'}`}
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
