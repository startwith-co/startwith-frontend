'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import ReviewModal from '@/features/my/ui/review-modal';
import formatDate, { formatDateTime } from '@/shared/lib/date-formatter';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import paymentMethodMap from '@/entities/my/model/payment-method-map';

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
  method: string;
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
  method,
}: DetailItemProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const gotoProduct = () =>
    router.push(`/products/${vendorSeq}?category=${category}`);

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <section
        role="button"
        tabIndex={0}
        onClick={gotoProduct}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') gotoProduct();
        }}
        className="cursor-pointer"
      >
        <h1 className="mb-2 text-2xl font-extrabold">
          {formatDate(titleDate)}
        </h1>

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
            <div className="flex flex-row space-x-6">
              <Avatar className="mb-2 flex h-[165px] w-[200px] rounded-sm bg-gray-100">
                <AvatarImage src={solutionImageUrl} alt="solutionImage" />
                <AvatarFallback>::</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-light text-[#151515]">
                    {company}
                  </span>
                  <span className="mt-2 text-lg font-bold">{solution}</span>
                </div>
                <div className="w-[300px]">
                  <div className="flex flex-row justify-between text-base">
                    <span>결제 수단</span>
                    <span className="font-bold">
                      {paymentMethodMap[method]}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between text-base">
                    <span>결제 금액</span>
                    <span className="font-bold">{price}원 (VAT포함)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                variant="login"
                asChild={false}
                onClick={(e) => {
                  stop(e);
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
                onClick={(e) => {
                  stop(e);
                  setOpen(true);
                }}
              >
                리뷰 남기기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 모달은 카드 밖에 두기 */}
      <ReviewModal open={open} setOpen={setOpen} solutionSeq={solutionSeq} />
    </>
  );
}

export default DetailItem;
