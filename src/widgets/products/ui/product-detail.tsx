import WhiteBox from '@/shared/ui/white-box';
import scale from '@/entities/product/model/scale';
import {
  SolutionDetailProps,
  VendorCategoryProps,
} from '@/views/products/model/type';
import cn from '@/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail({
  solutionName,
  solutionDetail,
  amount,
  solutionImplementationType,
  duration,
  industry,
  recommendedCompanySize,
  solutionEffect,
  representImageUrl,
  category,
  vendorCategory,
  vendorSeq,
}: SolutionDetailProps & {
  category: string;
  vendorCategory: VendorCategoryProps[];
  vendorSeq: string;
}) {
  return (
    <WhiteBox className="px-15 py-10 pb-8">
      <ul className="text-vendor-secondary flex items-center justify-around text-2xl">
        {vendorCategory.map((item) => (
          <li
            key={item.solutionSeq}
            className={cn(item.category === category && 'text-black')}
          >
            <Link href={`/products/${vendorSeq}?category=${item.category}`}>
              {item.category}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12.5 grid grid-cols-[1fr_1.8fr] gap-12.5">
        <Image
          src={representImageUrl}
          alt="image"
          width={200}
          height={170}
          className="bg-box-gray size-12 h-[210px] w-full rounded-md object-cover object-center"
        />
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
        <div className="flex gap-5">
          {industry.map((item) => (
            <div
              key={item}
              className="item-center text-primary flex h-[85px] w-[130px] items-center justify-center gap-3.5 rounded-md bg-white p-4 shadow-md"
            >
              <span className="text-center text-lg font-semibold">{item}</span>
            </div>
          ))}
        </div>
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
  );
}
