import { Button } from '@/shared/ui/button';
import Dropdown from '@/shared/ui/dropdown';
import Switch from '@/shared/ui/switch';

export default function Sidebar() {
  return (
    <div className="mt-23.5 flex flex-col gap-20">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h2 className="pb-3 text-lg font-semibold">ERP 기능별 기업 분류</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>전체</li>
            <li>재무/회계 특화</li>
            <li>구매/발주 특화</li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="pt-5 pb-3 text-lg font-semibold">재고/물류 특화</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>영업/판매 특화</li>
            <li>인사/급여 특화</li>
            <li>CRM 연동 특화</li>
            <li>분석/리포트 특화</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="pb-3 text-lg font-semibold">검색 필터</h2>
        <ul className="flex flex-col gap-3 text-sm">
          <li className="flex justify-between">
            <span>빠른 응답</span>
            <Switch />
          </li>
          <li className="flex justify-between">
            <span>Ai 기술 적용</span>
            <Switch />
          </li>
          <li className="flex justify-between">
            <span>고객 맞춤형</span>
            <Switch />
          </li>
          <li>
            <Dropdown
              buttonText="카테고리"
              items={[]}
              buttonClassName="font-normal w-full flex justify-between pr-3"
              divClassName="w-full"
            />
          </li>
          <li>
            <Dropdown
              buttonText="예산"
              items={[]}
              buttonClassName="font-normal w-full flex justify-between pr-3"
              divClassName="w-full"
            />
          </li>
        </ul>
        <div>
          <h2 className="pt-5 pb-3 text-lg font-semibold">적용된 필터</h2>
          <Button asChild={false} variant="category">
            적용
          </Button>
        </div>
      </div>
    </div>
  );
}
