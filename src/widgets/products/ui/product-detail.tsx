import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import WhiteBox from '@/shared/ui/white-box';
import scale from '@/entities/product/model/scale';
import { SolutionDetailProps } from '@/pages/products/model/type';
import cn from '@/shared/lib/utils';

export default function ProductDetail({
  solutionName,
  solutionDetail,
  amount,
  solutionImplementationType,
  duration,
  industry,
  recommendedCompanySize,
  solutionEffect,
  category,
}: SolutionDetailProps & { category: string }) {
  return (
    <>
      <WhiteBox className="px-15 py-10 pb-8">
        <ul className="text-vendor-secondary flex items-center justify-around text-2xl">
          {/* TODO: vendor 정보 api까지 연동하면 category 정보를 가져와서 처리 */}
          <li>CRM</li>
          <li>ERP</li>
          <li>HRM</li>
          <li className={cn(category === 'BI' && 'text-black')}>BI</li>
        </ul>
        <div className="mt-12.5 grid grid-cols-[1fr_1.8fr] gap-12.5">
          <div className="bg-box-gray size-12 h-[210px] w-full rounded-md" />
          <div className="flex flex-col">
            <span className="text-xl font-semibold">{solutionName}</span>
            <p className="mt-2.5">{solutionDetail}</p>
          </div>
        </div>
        <div className="mt-12.5 grid grid-cols-3 gap-16">
          <div className="bg-box-gray flex flex-col items-center justify-center gap-3.5 rounded-md p-4">
            <span className="text-lg font-semibold">가격</span>
            <span className="text-sm">{amount}원/월(VAT 별도)~</span>
          </div>
          <div className="bg-box-gray flex flex-col items-center justify-center gap-3.5 rounded-md p-4">
            <span className="text-lg font-semibold">서비스 형태</span>
            <span className="text-sm">
              {solutionImplementationType.join('/')}
            </span>
          </div>
          <div className="bg-box-gray flex flex-col items-center justify-center gap-3.5 rounded-md p-4">
            <span className="text-lg font-semibold">개발기간</span>
            <span className="text-sm">{duration}일</span>
          </div>
        </div>
        <div className="mt-12.5 flex flex-col gap-5">
          <span className="text-xl font-semibold">솔루션 도입 가능 산업군</span>
          {industry.map((item) => (
            <div
              key={item}
              className="text-primary flex h-[85px] w-[130px] items-center justify-center gap-3.5 rounded-md bg-white p-4 shadow-md"
            >
              <span className="text-lg font-semibold">{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-12.5 flex flex-col gap-5">
          <span className="text-xl font-semibold">
            솔루션 도입 가능 기업 규모
          </span>
          <div className="grid grid-cols-6 gap-5">
            {scale.map((item) => {
              const checked = recommendedCompanySize.includes(item);
              return (
                <div
                  key={item}
                  className={cn(
                    'bg-vendor-gray text-vendor-secondary flex h-[85px] items-center justify-center gap-3.5 rounded-md p-4',
                    checked && 'bg-primary text-white',
                  )}
                >
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-12.5 flex flex-col gap-5">
          <span className="text-xl font-semibold">솔루션 도입 성과</span>
          <div className="grid grid-cols-6 gap-5">
            {solutionEffect.map((item) => (
              <div
                key={item.effectName}
                className="bg-vendor-gray flex h-[85px] flex-col items-center justify-center rounded-md"
              >
                <span>{item.effectName}</span>
                <span className="text-primary text-lg font-bold">
                  {item.percent}%{' '}
                  {item.direction === 'INCREASE' ? '상승' : '하락'}
                </span>
              </div>
            ))}
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
            <span className="text-lg font-semibold">{solutionName}</span>
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
