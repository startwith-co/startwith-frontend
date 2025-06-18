'use client';

import { useState, useMemo } from 'react';
import Sidebar from '@/features/filter-search-result/ui/sidebar';
import GridItemsWidget from '@/widgets/search/grid-items-widget';
import SolutionProps from '../model/type';

export default function SearchPage({
  solutions,
  category,
  industry,
  budget,
}: {
  solutions: SolutionProps[];
  category: string;
  industry: string;
  budget: string;
}) {
  const [sortOption, setSortOption] = useState('인기순');

  const sortedSolutions = useMemo(() => {
    switch (sortOption) {
      case '인기순':
        return [...solutions].sort((a, b) => a.averageStar - b.averageStar);
      case '가격순':
        return [...solutions].sort((a, b) => a.amount - b.amount);
      case '리뷰많은순':
        return [...solutions].sort(
          (a, b) => a.countSolutionReview - b.countSolutionReview,
        );
      default:
        return solutions;
    }
  }, [solutions, sortOption]);

  return (
    <div className="mt-12 mb-96">
      {/* TODO: 배너 변경되는 애니메이션 추가 */}
      <div className="h-72 w-full rounded-md bg-gray-200" />
      <div className="grid grid-cols-[1fr_4.5fr] gap-[120px]">
        <Sidebar category={category} industry={industry} budget={budget} />
        <div className="mt-12.5 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">
              총 {solutions.length}개의 솔루션
            </h2>
            <select
              className="border-none"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>인기순</option>
              <option>가격순</option>
              <option>리뷰많은순</option>
            </select>
          </div>
          <GridItemsWidget solutions={sortedSolutions} />
        </div>
      </div>
    </div>
  );
}
