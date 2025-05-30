import Sidebar from '@/features/filter-search-result/ui/sidebar';
import Dropdown from '@/shared/ui/dropdown';
import GridItemsWidget from '@/widgets/search/grid-items-widget';

export default function SearchPage() {
  return (
    <div className="mt-12 mb-96">
      {/* TODO: 배너 변경되는 애니메이션 추가 */}
      <div className="h-72 w-full rounded-md bg-gray-200" />
      <div className="grid grid-cols-[1fr_4.5fr] gap-[120px]">
        {/* TODO: 사이드바 조건별로 다른 메뉴값 변경되게 */}
        <Sidebar />
        <div className="mt-12.5 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px]">총 15개의 서비스</h2>
            <Dropdown
              buttonText="정렬"
              items={[]}
              buttonClassName="font-normal text-[16px]"
            />
          </div>
          <GridItemsWidget />
        </div>
      </div>
    </div>
  );
}
