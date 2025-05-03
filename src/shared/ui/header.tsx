import { FiBell, FiMail } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import { PiGlobe } from 'react-icons/pi';
import Link from 'next/link';
import Input from './input';
import { Button } from './button';
import Dropdown from './dropdown';

interface HeaderProps {
  mode?: 'vendor' | 'user';
}

/**
 *
 * @param mode 'vendor' | 'user'
 * @returns Footer
 */

interface HeaderProps {
  mode?: 'vendor' | 'user';
}

export default function Header({ mode = 'user' }: HeaderProps) {
  return (
    <header
      className={`flex items-center justify-between px-4 pt-[35px] sm:px-8 md:px-16 lg:px-32 2xl:px-[300px] ${
        mode === 'user' ? '' : 'bg-[#212121]'
      }`}
    >
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1
            className={`text-3xl font-bold ${mode === 'user' ? 'text-primary' : 'bg-gradient-to-t from-[#F4F8FF] to-[#DBE8FF] bg-clip-text text-transparent'}`}
          >
            SOLU
            {mode === 'vendor' && (
              <span className="ml-3 bg-gradient-to-t from-[#F4F8FF] to-[#DBE8FF] bg-clip-text indent-1 text-xl font-bold text-transparent">
                밴더 HOME
              </span>
            )}
          </h1>
        </Link>
        {mode === 'user' && (
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
        )}
      </div>
      <div className="flex items-center gap-3.5 text-[12px]">
        <Button asChild={false} variant="vendor" className="h-7 text-[12px]">
          {mode === 'user' ? '밴더 전용 HOME' : '플랫폼 HOME'}
        </Button>
        <Button asChild={false} variant="ghost" className="h-7 text-[12px]">
          <PiGlobe />
          <span className="font-normal">Language</span>
        </Button>
        {mode === 'user' && (
          <>
            <FiBell size={24} />
            <FiMail size={24} />
            <Dropdown
              buttonText="스타트윗"
              items={[
                {
                  label: '내 정보',
                },
              ]}
            />
          </>
        )}
      </div>
    </header>
  );
}
