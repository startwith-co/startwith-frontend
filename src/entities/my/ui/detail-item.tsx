'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import ReviewModal from '@/features/my/ui/review-modal';
import formatDate, { formatDateTime } from '@/shared/lib/date-formatter';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface DetailItemProps {
  titleDate: string;
  status: string;
  statusDate: string;
  company: string;
  solution: string;
  price: string;
  solutionSeq: number;
  solutionImageUrl: string;
  vendorUniqueType: string;
  vendorSeq: number;
  category: string;
}

function DetailItem({
  titleDate,
  status,
  statusDate,
  company,
  solution,
  price,
  solutionSeq,
  solutionImageUrl,
  vendorUniqueType,
  vendorSeq,
  category,
}: DetailItemProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Link href={`/products/${vendorSeq}?category=${category}`}>
      <h1 className="text-2xl font-extrabold">{formatDate(titleDate)}</h1>
      <div className="flex h-[300px] w-[840px] flex-col rounded-2xl bg-[#F5F5F5] p-5">
        <div className="align-center mt-5 flex flex-row space-x-10">
          <span className="text-lg font-bold">
            {status === 'Done' ? '개발 완료' : '구매 확정'}
          </span>
          <span className="mt-1 text-sm font-light text-[#151515]">
            {formatDateTime(statusDate)}
          </span>
        </div>
        <div className="mt-3 flex flex-row justify-between">
          <div className="flex flex-row space-x-2">
            <Avatar className="bg-gray mb-2 flex h-[165px] w-[200px] rounded-sm">
              <AvatarImage src={solutionImageUrl} alt="solutionImage" />
              <AvatarFallback>::</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-light text-[#151515]">
                  {company}
                </span>
                <span className="text-lg font-bold">{solution}</span>
              </div>
              <span className="mt-15 text-lg font-bold">
                {price}원 (VAT포함)
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Button
              variant="login"
              asChild={false}
              onClick={() => {
                router.push(
                  `/chat?vendorId=${vendorUniqueType}&consumerId=${session?.uniqueType}`,
                );
              }}
              className="w-[150px] rounded-sm border-1 border-[#7A7A7A] bg-white text-[#7A7A7A]"
            >
              문의하기
            </Button>
            <Button
              variant="login"
              asChild={false}
              className="w-[150px] rounded-sm bg-[#4f7df9] text-white"
              onClick={() => setOpen(true)}
            >
              리뷰 남기기
            </Button>
          </div>
        </div>
      </div>
      <ReviewModal open={open} setOpen={setOpen} solutionSeq={solutionSeq} />
    </Link>
  );
}

export default DetailItem;
