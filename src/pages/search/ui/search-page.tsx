import Sidebar from '@/features/filter-search-result/ui/sidebar';
import Dropdown from '@/shared/ui/dropdown';
import GridItemsWidget from '@/widgets/search/grid-items-widget';
import getSolutionList from '../api/getSolutionList';

export default async function SearchPage({
  category,
  industry,
  budget,
  page,
}: {
  category: string;
  industry: string;
  budget: string;
  page: string;
}) {
  const solutions = await getSolutionList({
    category,
    industry,
    budget,
    page,
  });

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
            <Dropdown
              buttonText="정렬"
              items={[]}
              buttonClassName="font-normal text-[16px]"
            />
          </div>
          <GridItemsWidget solutions={solutions} />
        </div>
      </div>
    </div>
  );
}
