'use client';

import { useRef } from 'react';
import Input from '@/shared/ui/input';
import { IoSearchOutline, IoChevronDown } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { solutionCategoryLabels } from '@/shared/model/getCategoryList';
import { Button } from '@/shared/ui/button';

function MainSectionInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = inputRef.current?.value.trim();
    if (keyword) {
      router.push(`/search?keyword=${keyword}`);
    }
  };

  const handleClick = (button: string) => {
    router.push(`/search?category=${button}`);
  };

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <form onSubmit={handleSearch} className="relative mb-5">
        <IoSearchOutline
          size={20}
          className="absolute top-1/2 left-3 -translate-y-1/2 transform"
        />
        <Input
          ref={inputRef}
          type="search"
          placeholder="키워드를 검색해주세요."
          className="h-[45px] w-[820px] rounded-3xl bg-white pl-10 text-black shadow-sm placeholder:text-black"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-3 flex size-[30px] -translate-y-1/2 transform items-center justify-center rounded-full bg-black p-1 text-center text-white"
        >
          →
        </button>
      </form>

      <div className="mb-50 flex gap-2">
        {solutionCategoryLabels.map((button) => (
          <Button
            key={button}
            variant="vendorBlack"
            className="h-[35px] w-[180px] rounded-full text-xs whitespace-pre-line shadow-md"
            asChild={false}
            onClick={() => handleClick(button)}
          >
            {button}
          </Button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-center font-bold">비즈니스 문제 해결하기</p>

        <button
          onClick={scrollDown}
          className="flex size-12 items-center justify-center rounded-full bg-black text-white shadow-xl transition hover:scale-110"
        >
          <IoChevronDown size={26} />
        </button>
      </div>
    </>
  );
}

export default MainSectionInput;
