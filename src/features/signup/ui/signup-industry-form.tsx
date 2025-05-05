'use client';

import cn from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

const industries = [
  '건설',
  '공공',
  '교육',
  '금융',
  '농업/어업/임업',
  '물류/유통',
  '부동산/임대',
  '숙박',
  '스포츠',
  '요식/외식',
  '예술',
  '정보통신/IT',
  '제조',
  '환경/에너지',
];

function IndustrySelectGrid({
  selectedIndustry,
  setSelectedIndustry,
}: {
  selectedIndustry: string | null;
  setSelectedIndustry: (industry: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {industries.map((industry) => (
        <Button
          key={industry}
          type="button"
          onClick={() => setSelectedIndustry(industry)}
          className={cn(
            'rounded-md px-4 py-2 text-sm font-medium',
            'bg-[#F5F5F5] text-black',
            selectedIndustry === industry && 'bg-[#5B76FF] text-white',
          )}
          asChild={false}
        >
          {industry}
        </Button>
      ))}
    </div>
  );
}

export default IndustrySelectGrid;
