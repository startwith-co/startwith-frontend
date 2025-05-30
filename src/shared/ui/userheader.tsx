'use client';

import Link from 'next/link';
import { FiBell, FiMail } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import { PiGlobe } from 'react-icons/pi';
import Input from './input';
import { Button } from './button';
import Dropdown from './dropdown';

export default function UserHeader() {
  return (
    <header className="flex items-center justify-between bg-transparent px-4 pt-[35px] sm:px-8 md:px-16 lg:px-32 2xl:px-[300px]">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-primary text-3xl font-bold">SOLU</h1>
        </Link>
        <div className="relative">
          <IoSearchOutline
            size={20}
            className="absolute top-1/2 left-3 -translate-y-1/2 transform"
          />
          <Input
            type="search"
            placeholder="키워드를 검색해주세요."
            className="h-[45px] w-[420px] rounded-3xl bg-white pl-10 text-black shadow-sm placeholder:text-black"
          />
          <button className="absolute top-1/2 right-3 flex size-[30px] -translate-y-1/2 transform items-center justify-center rounded-full bg-black p-1 text-center text-white">
            →
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3.5 text-[12px]">
        <Link href="/vendor">
          <Button asChild={false} variant="vendor" className="h-7 text-[12px]">
            밴더 전용 HOME
          </Button>
        </Link>
        <Button asChild={false} variant="ghost" className="h-7 text-[12px]">
          <PiGlobe />
          <span className="font-normal">Language</span>
        </Button>
        <FiBell size={24} />
        <FiMail size={24} />
        <Dropdown buttonText="스타트윗" items={[{ label: '내 정보' }]} />
      </div>
    </header>
  );
}
