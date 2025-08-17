import WhiteBox from '@/shared/ui/white-box';
import PieChart from '@/entities/product/ui/pie-chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { IoIosStar } from 'react-icons/io';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';
import getReviewList from '@/widgets/products/api/getReviewList';
import { v4 as uuidv4 } from 'uuid';
import { formatReviewTime } from '@/shared/lib/date-formatter';
import { StatsProps } from '@/views/vendorMy/model/type';

export default async function ProductChart({
  solutionSeq,
  stats,
}: {
  solutionSeq: number;
  stats: StatsProps[];
}) {
  const data = await getReviewList(solutionSeq);
  return (
    <WhiteBox className="flex flex-col gap-[60px] p-8">
      <div className="flex flex-col gap-6.5">
        <span className="text-xl font-semibold">이용자 개요 분석</span>
        <div className="flex items-center justify-around">
          <PieChart
            stats={stats.filter((stat) => stat.statType === 'SALES_SIZE')}
            title="매출 규모별 기업 고객 개요"
          />
          <PieChart
            stats={stats.filter((stat) => stat.statType === 'EMPLOYEES_SIZE')}
            title="매출 규모별 기업 고객 개요"
          />
        </div>
      </div>
      <div className="relative -top-32 flex flex-col">
        <span className="mb-6.5 text-xl font-bold">
          스타트윗 주요 기업 고객
        </span>
        <div className="grid grid-cols-6">
          <div className="bg-vendor-gray aspect-square" />
        </div>
      </div>
      <div className="relative -top-32 flex flex-col">
        <span className="text-xl font-bold">고객 리뷰</span>
        {/* TODO: 최상단 li pt제거, 마지막 li border-b 제거, 리뷰가 없을 때 UI 추가 */}
        <ul>
          {data.map((review) => (
            <li
              key={review.consumerSeq}
              className="flex items-center justify-between border-b py-5"
            >
              <div className="flex items-center gap-5">
                <Avatar className="size-12.5">
                  <AvatarImage src={review.consumerImageUrl} />
                  <AvatarFallback>{review.consumerName}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center">
                    <span className="mr-2.5 text-sm font-normal">
                      {review.consumerName}
                    </span>
                    {[...Array(review.start)].map((_) => (
                      <IoIosStar key={uuidv4()} />
                    ))}
                  </div>
                  <p>{review.comment}</p>
                </div>
              </div>
              <p className="self-end text-[13px] text-[#717171]">
                작성일시: {formatReviewTime(review.createdAt)}
              </p>
            </li>
          ))}
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
