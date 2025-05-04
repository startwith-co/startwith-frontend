import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';
import WhiteBox from '@/shared/ui/white-box';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { IoIosStar } from 'react-icons/io';

export default function ProductsReview() {
  return (
    <WhiteBox className="flex flex-col gap-14.5 px-9 py-7.5">
      <div className="flex flex-col gap-6.5">
        <span className="text-xl font-bold">솔루션 도입 성과</span>
        <div className="flex gap-7.5">
          <div className="bg-box-gray flex flex-col items-center justify-center rounded-md px-7.5 py-[17.5px]">
            <span>업무효율</span>
            <span className="text-accent text-lg font-semibold">60% 상승</span>
          </div>
          <div className="bg-box-gray flex flex-col items-center justify-center rounded-md px-7.5 py-[17.5px]">
            <span>업무효율</span>
            <span className="text-accent text-lg font-semibold">60% 상승</span>
          </div>
          <div className="bg-box-gray flex flex-col items-center justify-center rounded-md px-7.5 py-[17.5px]">
            <span>업무효율</span>
            <span className="text-accent text-lg font-semibold">60% 상승</span>
          </div>
          <div className="bg-box-gray flex flex-col items-center justify-center rounded-md px-7.5 py-[17.5px]">
            <span>업무효율</span>
            <span className="text-accent text-lg font-semibold">60% 상승</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6.5">
        <span className="text-xl font-bold">솔루션 적용 태그</span>
        <div className="flex gap-7.5">
          <span className="bg-box-gray flex h-[55px] w-[157px] items-center justify-center rounded-md">
            재무/회계 특화
          </span>
          <span className="bg-box-gray flex h-[55px] w-[157px] items-center justify-center rounded-md">
            커스터마이징
          </span>
          <span className="bg-box-gray flex h-[55px] w-[157px] items-center justify-center rounded-md">
            분석/리포트 제공
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-6.5">
        <span className="text-xl font-bold">더비즈온 주요 고객사</span>
        <div className="flex flex-wrap gap-14.5">
          <div className="bg-light size-14.5 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="mb-6.5 text-xl font-bold">고객 리뷰</span>
        {/* TODO: 최상단 li pt제거, 마지막 li border-b 제거, 리뷰가 없을 때 UI 추가 */}
        <ul>
          <li className="flex items-center justify-between border-b py-5">
            <div className="flex items-center gap-5">
              <Avatar className="size-12.5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <span className="mr-2.5 text-sm font-normal">더비즈온</span>
                  <IoIosStar />
                </div>
                <p>리뷰 내용</p>
              </div>
            </div>
            <p className="self-end text-[13px] text-[#717171]">
              작성일시 : 25.01.01 AM 11:38
            </p>
          </li>
          <li className="flex items-center justify-between border-b pt-6.5 pb-5">
            <div className="flex items-center gap-5">
              <Avatar className="size-12.5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <span className="mr-2.5 text-sm font-normal">더비즈온</span>
                  <IoIosStar />
                </div>
                <p>리뷰 내용</p>
              </div>
            </div>
            <p className="self-end text-[13px] text-[#717171]">
              작성일시 : 25.01.01 AM 11:38
            </p>
          </li>
        </ul>
        <Pagination className="mt-8.5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="border bg-white text-[#AAAAAA]"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="bg-white text-[#7D7D7D]">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="bg-white text-[#7D7D7D]">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="bg-white text-[#7D7D7D]">
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                className="border bg-white text-[#AAAAAA]"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </WhiteBox>
  );
}
