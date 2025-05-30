'use client';

import Link from 'next/link';
import { PiGlobe } from 'react-icons/pi';
import { Button } from './button';

export default function VendorHeader() {
  return (
    <header className="bg-vendor-gray flex items-center justify-between pt-[35px] pr-8 pl-[222px]">
      <Link href="/vendor" className="text-vendor-primary">
        <h1 className="text-3xl font-bold">
          SOLU
          <span className="ml-3 text-xl font-bold">밴더 HOME</span>
        </h1>
      </Link>
      <div className="flex items-center gap-3.5 text-[12px]">
        <Link href="/">
          <Button asChild={false} variant="vendor" className="h-7 text-[12px]">
            플랫폼 HOME
          </Button>
        </Link>
        <Button asChild={false} variant="ghost" className="h-7 text-[12px]">
          <PiGlobe />
          <span className="font-normal">Language</span>
        </Button>
      </div>
    </header>
  );
}
