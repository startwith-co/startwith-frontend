'use client';

import cn from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { industryCategoryToValue } from '@/shared/model/getCategoryList';

function IndustrySelectGrid({
  selectedIndustry,
  setSelectedIndustry,
}: {
  selectedIndustry: { label: string; value: string } | null;
  setSelectedIndustry: (industry: { label: string; value: string }) => void;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      {Object.entries(industryCategoryToValue).map(([label, value]) => (
        <Button
          key={value}
          type="button"
          onClick={() => setSelectedIndustry({ label, value })}
          className={cn(
            'h-[45px] w-full rounded-md py-2 text-sm font-medium',
            'bg-[#F5F5F5] text-black',
            selectedIndustry?.value === value && 'bg-[#5B76FF] text-white',
          )}
          asChild={false}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

export default IndustrySelectGrid;
