'use client';

import cn from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

const industries = [
  { label: '금속 / 기계 / 자동차 부품 제조', value: 'Metal' },
  { label: '금형 / 정밀가공 제조', value: 'Mold' },
  { label: '식음료 / 식품 / 포장 제조', value: 'Food' },
  { label: '전자 / 전기 / 배터리 제조', value: 'Electronics' },
];

function IndustrySelectGrid({
  selectedIndustry,
  setSelectedIndustry,
}: {
  selectedIndustry: { label: string; value: string } | null;
  setSelectedIndustry: (industry: { label: string; value: string }) => void;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      {industries.map((industry) => (
        <Button
          key={industry.value}
          type="button"
          onClick={() => setSelectedIndustry(industry)}
          className={cn(
            'h-[45px] w-full rounded-md py-2 text-sm font-medium',
            'bg-[#F5F5F5] text-black',
            selectedIndustry?.value === industry.value &&
              'bg-[#5B76FF] text-white',
          )}
          asChild={false}
        >
          {industry.label}
        </Button>
      ))}
    </div>
  );
}

export default IndustrySelectGrid;
