import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { IoIosStar } from 'react-icons/io';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';

export default function ProductsDetailPage() {
  return (
    <div className="mt-10">
      <div className="h-72 w-full bg-gray-200" />

      <div className="mt-6.5 grid grid-cols-[1fr_3.5fr] gap-10 px-4 sm:px-8 md:px-16 lg:px-32 2xl:px-[300px]">
        {/* 카드 컴포넌트 */}
        <div className="flex flex-col gap-6">
          <div className="flex w-full flex-col items-center justify-center rounded-md bg-white p-6 shadow-md">
            <Avatar className="mb-3.5 size-26">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold">더비즈온</span>
            <Button asChild={false} className="mt-4.5 rounded-3xl">
              문의하기
            </Button>
          </div>
        </div>
        {/* 상세 정보 컴포넌트 */}
        <div className="flex flex-col gap-10">
          <div className="rounded-md bg-white px-21.5 pt-[22px] pb-8 shadow-md">
            <ul className="flex items-center justify-around">
              <li>CRM</li>
              <li>ERP</li>
              <li>HRM</li>
              <li>BI</li>
            </ul>
            <div className="mt-12.5 grid grid-cols-[1fr_1.8fr] gap-12.5">
              <div className="size-12 h-[210px] w-full rounded-md bg-gray-200" />
              <div className="flex flex-col">
                <span className="text-xl font-semibold">더비즈온</span>
                <p className="mt-8">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                  reprehenderit modi deleniti asperiores ipsum temporibus vitae
                  neque vero quasi cum laborum doloremque rem sed, facilis
                  consequatur culpa, commodi nisi nemo.
                </p>
              </div>
            </div>
            <div className="mt-12.5 grid grid-cols-3 gap-16">
              <div className="flex flex-col items-center justify-center gap-3.5 rounded-md bg-gray-300 p-4">
                <span className="text-lg font-semibold">가격</span>
                <span className="text-sm">2,000,000원/월(VAT 별도)~</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-3.5 rounded-md bg-gray-300 p-4">
                <span className="text-lg font-semibold">서비스 형태</span>
                <span className="text-sm">SaaS/구축형</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-3.5 rounded-md bg-gray-300 p-4">
                <span className="text-lg font-semibold">개발기간</span>
                <span className="text-sm">1개월 ~ 6개월</span>
              </div>
            </div>
          </div>
          {/* 컴포넌트2 */}
          <div className="flex flex-col gap-7.5 rounded-md bg-white p-6 shadow-md">
            <div className="flex items-center gap-6">
              <Avatar className="mb-3.5 size-24">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-lg font-semibold">더비즈온</span>
                <p className="mt-2.5 text-sm">
                  상담 가능 시간 : 평일 09~18시, 주말 및 공휴일 상담 불가능
                  <br />
                  평균 응답 시간 : 1시간 이내
                </p>
              </div>
              <div className="ml-auto grid w-full max-w-[380px] grid-cols-3 gap-3">
                <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-gray-300 px-4.5 py-3.5">
                  <span className="text-sm">총 거래 건수</span>
                  <span className="text-lg font-semibold">100건</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-gray-300 px-4.5 py-3.5">
                  <span className="text-sm">만족도</span>
                  <span className="text-lg font-semibold">100%</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-gray-300 px-4.5 py-3.5">
                  <span className="text-sm">고객사</span>
                  <span className="text-lg font-semibold">100곳</span>
                </div>
              </div>
            </div>
            <div className="h-[210px] w-full rounded-md bg-gray-200" />
          </div>
          {/* TODO: 컴포넌트 3: 차트 */}

          {/* 컴포넌트 4 */}
          <div className="flex flex-col gap-14.5 rounded-md bg-white px-9 py-7.5 shadow-md">
            <div className="flex flex-col gap-6.5">
              <span className="text-xl font-bold">솔루션 도입 성과</span>
              <div className="flex gap-7.5">
                <div className="flex flex-col items-center justify-center rounded-md bg-gray-300 px-7.5 py-[17.5px]">
                  <span>업무효율</span>
                  <span className="text-accent text-lg font-semibold">
                    60% 상승
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-md bg-gray-300 px-7.5 py-[17.5px]">
                  <span>업무효율</span>
                  <span className="text-accent text-lg font-semibold">
                    60% 상승
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-md bg-gray-300 px-7.5 py-[17.5px]">
                  <span>업무효율</span>
                  <span className="text-accent text-lg font-semibold">
                    60% 상승
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-md bg-gray-300 px-7.5 py-[17.5px]">
                  <span>업무효율</span>
                  <span className="text-accent text-lg font-semibold">
                    60% 상승
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6.5">
              <span className="text-xl font-bold">솔루션 적용 태그</span>
              <div className="flex gap-7.5">
                <span className="flex h-[55px] w-[157px] items-center justify-center rounded-md bg-gray-300">
                  재무/회계 특화
                </span>
                <span className="flex h-[55px] w-[157px] items-center justify-center rounded-md bg-gray-300">
                  커스터마이징
                </span>
                <span className="flex h-[55px] w-[157px] items-center justify-center rounded-md bg-gray-300">
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
              {/* TODO: 최상단 li pt제거, 마지막 li border-b 제거 */}
              <ul>
                <li className="flex items-center justify-between border-b py-5">
                  <div className="flex items-center gap-5">
                    <Avatar className="size-12.5">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center">
                        <span className="mr-2.5 text-sm font-normal">
                          더비즈온
                        </span>
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
                        <span className="mr-2.5 text-sm font-normal">
                          더비즈온
                        </span>
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
                    <PaginationLink
                      href="#"
                      className="bg-white text-[#7D7D7D]"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="bg-white text-[#7D7D7D]"
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="bg-white text-[#7D7D7D]"
                    >
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
          </div>
        </div>
        <div />
      </div>
    </div>
  );
}
