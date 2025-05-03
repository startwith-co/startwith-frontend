'use client';

import Link from 'next/link';
import { PiGlobe } from 'react-icons/pi';
import { Button } from './button';

export default function VendorHeader() {
  return (
    <header className="flex items-center justify-between bg-[#212121] px-4 pt-[35px] sm:px-8 md:px-16 lg:px-32 2xl:px-[300px]">
      <Link href="/">
        <h1 className="bg-gradient-to-t from-[#F4F8FF] to-[#DBE8FF] bg-clip-text text-3xl font-bold text-transparent">
          SOLU
          <span className="ml-3 bg-gradient-to-t from-[#F4F8FF] to-[#DBE8FF] bg-clip-text text-xl font-bold text-transparent">
            밴더 HOME
          </span>
        </h1>
      </Link>
      <div className="flex items-center gap-3.5 text-[12px]">
        <Button asChild={false} variant="vendor" className="h-7 text-[12px]">
          플랫폼 HOME
        </Button>
        <Button asChild={false} variant="ghost" className="h-7 text-[12px]">
          <PiGlobe />
          <span className="font-normal">Language</span>
        </Button>
      </div>
    </header>
  );
}
