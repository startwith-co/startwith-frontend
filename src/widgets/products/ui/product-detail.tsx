import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import WhiteBox from '@/shared/ui/white-box';
import scale from '@/entities/product/model/scale';

export default function ProductDetail() {
  return (
    <>
      <WhiteBox className="px-15 py-10 pb-8">
        <ul className="flex items-center justify-around text-2xl">
          <li>CRM</li>
          <li>ERP</li>
          <li>HRM</li>
          <li>BI</li>
        </ul>
        <div className="mt-12.5 grid grid-cols-[1fr_1.8fr] gap-12.5">
          <div className="bg-box-gray size-12 h-[210px] w-full rounded-md" />
          <div className="flex flex-col">
            <span className="text-xl font-semibold">더비즈온</span>
            <p className="mt-2.5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              reprehenderit modi deleniti asperiores ipsum temporibus vitae
              neque vero quasi cum laborum doloremque rem sed, facilis
              consequatur culpa, commodi nisi nemo.
            </p>
          </div>
        </div>
        <div className="mt-12.5 grid grid-cols-3 gap-16">
          <div className="bg-box-gray flex flex-col items-center justify-center gap-3.5 rounded-md p-4">
            <span className="text-lg font-semibold">가격</span>
            <span className="text-sm">2,000,000원/월(VAT 별도)~</span>
          </div>
          <div className="bg-box-gray flex flex-col items-center justify-center gap-3.5 rounded-md p-4">
            <span className="text-lg font-semibold">서비스 형태</span>
            <span className="text-sm">SaaS/구축형</span>
          </div>
          <div className="bg-box-gray flex flex-col items-center justify-center gap-3.5 rounded-md p-4">
            <span className="text-lg font-semibold">개발기간</span>
            <span className="text-sm">1개월 ~ 6개월</span>
          </div>
        </div>
        <div className="mt-12.5 flex flex-col gap-5">
          <span className="text-xl font-semibold">솔루션 도입 가능 산업군</span>
          <div className="text-primary flex h-[85px] w-[130px] items-center justify-center gap-3.5 rounded-md bg-white p-4 shadow-md">
            <span className="text-lg font-semibold">제조</span>
          </div>
        </div>
        <div className="mt-12.5 flex flex-col gap-5">
          <span className="text-xl font-semibold">
            솔루션 도입 가능 기업 규모
          </span>
          <div className="grid grid-cols-6 gap-5">
            {scale.map((item) => (
              <div
                key={item}
                className="bg-vendor-gray text-vendor-secondary flex h-[85px] items-center justify-center gap-3.5 rounded-md p-4"
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12.5 flex flex-col gap-5">
          <span className="text-xl font-semibold">솔루션 도입 성과</span>
          <div className="grid grid-cols-6 gap-5">
            <div className="bg-vendor-gray flex h-[85px] flex-col items-center justify-center rounded-md">
              <span>업무 효율</span>
              <span className="text-primary text-lg font-bold">38% 상승</span>
            </div>
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
            <div className="bg-box-gray flex flex-col items-center justify-center gap-3 rounded-md px-4.5 py-3.5">
              <span className="text-sm">총 거래 건수</span>
              <span className="text-lg font-semibold">100건</span>
            </div>
            <div className="bg-box-gray flex flex-col items-center justify-center gap-3 rounded-md px-4.5 py-3.5">
              <span className="text-sm">만족도</span>
              <span className="text-lg font-semibold">100%</span>
            </div>
            <div className="bg-box-gray flex flex-col items-center justify-center gap-3 rounded-md px-4.5 py-3.5">
              <span className="text-sm">고객사</span>
              <span className="text-lg font-semibold">100곳</span>
            </div>
          </div>
        </div>
        <div className="bg-box-gray h-[210px] w-full rounded-md" />
      </WhiteBox>
    </>
  );
}
