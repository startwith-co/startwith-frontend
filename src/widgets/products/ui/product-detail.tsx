import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import WhiteBox from '@/shared/ui/white-box';

export default function ProductDetail() {
  return (
    <>
      <WhiteBox className="px-21.5 pt-[22px] pb-8">
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
      </WhiteBox>
      {/* 컴포넌트2 */}
      <WhiteBox className="flex flex-col gap-7.5 px-9 pt-7 pb-8">
        <div className="flex items-center gap-6">
          <Avatar className="size-24">
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
      </WhiteBox>
    </>
  );
}
