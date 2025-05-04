'use client';

import WhiteBox from '@/shared/ui/white-box';
import PieChart from '@/entities/product/ui/pie-chart';
import LineChart from '@/entities/product/ui/line-chart';
import scale from '@/widgets/products/model/scale';

export default function ProductChart() {
  return (
    <WhiteBox className="flex flex-col gap-[60px] p-8">
      <div className="flex flex-col gap-6.5">
        <span className="text-xl font-semibold">추천 산업군</span>
        <div className="flex gap-4">
          <div className="bg-light flex items-center justify-center rounded-md px-5 py-2">
            제조
          </div>
          <div className="bg-light flex items-center justify-center rounded-md px-5 py-2">
            제조
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6.5">
        <span className="text-xl font-semibold">추천 규모</span>
        <div className="flex gap-4">
          {scale.map((item) => (
            <div
              className="bg-box-gray hover flex h-[100px] w-[160px] items-center justify-center rounded-md font-semibold text-[#696969] hover:bg-gradient-to-r hover:from-[#6E86FF] hover:to-[#5B76FF] hover:text-white"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6.5">
        <span className="text-xl font-semibold">이용자 개요 분석</span>
        <div className="flex items-center justify-around">
          <PieChart />
          <PieChart />
        </div>
      </div>
      <div className="-mt-32 flex flex-col gap-6.5">
        <span className="text-xl font-semibold">이용자 증감 분석</span>
        <LineChart />
      </div>
      <div className="flex flex-col gap-6.5">
        <span className="text-xl font-semibold">이용자 누적 추이 분석</span>
        <LineChart />
      </div>
    </WhiteBox>
  );
}
