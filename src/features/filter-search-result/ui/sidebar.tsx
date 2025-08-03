'use client';

import FilterButton from '@/entities/search/ui/filter-button';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import {
  industryCategories,
  scaleCategories,
  solutionCategories,
} from '@/entities/search/model/sidebar-filter';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const categoryMap: Record<string, string> = {
  '비전 검사': '불량 검출 · 예측(비전 검사)',
  예지보전: '설비 이상 및 고장 예측(예지보전)',
  '공정 이상 감지': '실시간 공정 상태 모니터링(공정 이상 감지)',
  '공정 재고관리': 'MES 재고관리(공정 재고관리)',
};

export default function Sidebar({
  category = '',
  industry = '',
  budget = '',
}: {
  category?: string;
  industry?: string;
  budget?: string;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterList, setFilterList] = useState({
    category: category.match(/\(([^)]+)\)/)?.[1],
    industry,
    budget,
  });
  const router = useRouter();

  const handleFilter = () => {
    const params = new URLSearchParams();

    const categoryValue = categoryMap[filterList.category as string];
    if (categoryValue) params.set('category', categoryValue);

    if (filterList.industry) params.set('industry', filterList.industry);
    if (filterList.budget) params.set('budget', filterList.budget);

    const query = params.toString();
    router.push(`/search${query ? `?${query}` : ''}`);
  };

  return (
    <div className="mt-23.5 flex w-[241px] flex-col gap-12.5">
      <div className="flex flex-col">
        <h2 className="mb-3 text-lg font-semibold">상세 검색</h2>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex w-[171px] items-center justify-between text-start text-sm"
        >
          솔루션 상세 검색
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isFilterOpen && (
          <div>
            <ul className="mt-5 flex flex-col gap-7.5 [&>li>div]:mt-2.5">
              <li>
                <span>솔루션 카테고리 선택</span>
                <div className="grid grid-cols-2 gap-3.5">
                  {solutionCategories.map((solutionCategory) => (
                    <FilterButton
                      key={solutionCategory}
                      value={solutionCategory}
                      isActive={solutionCategory === filterList.category}
                      onClick={() =>
                        setFilterList({
                          ...filterList,
                          category: solutionCategory,
                        })
                      }
                    />
                  ))}
                </div>
              </li>
              <li>
                <span>산업군 카테고리 선택</span>
                <div className="flex flex-wrap gap-3.5">
                  {industryCategories.map((industryCategory) => (
                    <FilterButton
                      key={industryCategory}
                      value={industryCategory}
                      isActive={industryCategory === filterList.industry}
                      onClick={() =>
                        setFilterList({
                          ...filterList,
                          industry: industryCategory,
                        })
                      }
                    />
                  ))}
                </div>
              </li>
              <li>
                <span>예산 설정</span>
                <div className="flex flex-col gap-3.5">
                  {scaleCategories.map((scaleCategory) => (
                    <FilterButton
                      key={scaleCategory}
                      value={scaleCategory}
                      className="text-xs"
                      isActive={scaleCategory === filterList.budget}
                      onClick={() =>
                        setFilterList({
                          ...filterList,
                          budget: scaleCategory,
                        })
                      }
                    />
                  ))}
                </div>
              </li>
            </ul>

            <Button
              asChild={false}
              className="mt-7.5 w-full"
              onClick={handleFilter}
            >
              설정하기
            </Button>
          </div>
        )}
      </div>
      <div>
        <h2 className="mb-3 text-lg font-semibold">적용된 필터</h2>
        <div className="flex flex-wrap gap-3.5">
          {Object.entries(filterList).map(
            ([key, value]) =>
              value &&
              value.length > 0 && (
                <Button key={key} asChild={false} variant="category">
                  {value}
                </Button>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
