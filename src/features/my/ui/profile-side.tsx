'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

function ProfileSide() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="mr-7 flex h-[350px] w-[220px] flex-col items-center justify-center rounded-2xl bg-white shadow-md">
      <Avatar className="mb-2 flex size-30 rounded-full">
        <AvatarImage src="/image/image.png" />
        <AvatarFallback>스타트윗</AvatarFallback>
      </Avatar>
      <h1 className="mb-5 text-3xl font-bold">스타트윗</h1>

      <Link
        href="/my/detail"
        className={`mb-5 ${isActive('/my/detail') ? 'text-lg font-bold' : 'text-sm font-semibold'}`}
      >
        상세 정보
      </Link>

      <Link
        href="/my/profile"
        className={` ${isActive('/my/profile') ? 'text-lg font-bold' : 'text-sm font-semibold'}`}
      >
        내 정보
      </Link>
    </aside>
  );
}

export default ProfileSide;
