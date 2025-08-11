import formatLocalPrice from '@/shared/lib/formatLocalPrice';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { PaymentInfoProps } from '@/views/payment/model/type';
import categoryTrans from '@/widgets/products/utils/categoryTrans';
import Image from 'next/image';
import defaultImage from 'public/images/404.png';

export default function OrderDetailsWidget({
  paymentEventName,
  category,
  amount,
  representImageUrl,
}: PaymentInfoProps) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">주문 내역</h2>
      <div className="flex w-full flex-col rounded-md bg-white p-6 shadow-md">
        <div className="flex w-full gap-8">
          <Image
            src={representImageUrl || defaultImage}
            alt="image"
            width={200}
            height={170}
            className="h-full w-[320px] rounded-md bg-gray-300 object-cover object-center"
          />
          <div className="flex flex-col justify-between gap-3">
            <div>
              <span className="font-semibold">{paymentEventName}</span>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/images/default-profile.svg" />
                  <AvatarFallback>{paymentEventName[0]}</AvatarFallback>
                </Avatar>
                <span className="text-[rgba(167,167,167,1)]">더비즈온</span>
              </div>
            </div>
            <div className="flex w-[300px] flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-[#7A7A7A]">가격</span>
                <span>{formatLocalPrice(amount)}원(VAT제외)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7A7A]">솔루션 카테고리</span>
                <span>{categoryTrans(category)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7A7A]">최대 서비스 제공일</span>
                <span>6개월</span>
              </div>
            </div>
            <div>
              <div className="flex flex-col justify-between">
                <span className="text-[#7A7A7A]">제공 서비스 상세</span>
                <ul className="text-vendor-secondary flex flex-col text-[13px] font-light">
                  <li>&middot; 기업 요구에 따른 벤더 매칭 및 계약 조율</li>
                  <li>&middot; 기술 요건 확인 및 RFP 대행</li>
                  <li>
                    &middot; 솔루션 도입 후 3개월간 사용 지원 및 이슈 대응
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
