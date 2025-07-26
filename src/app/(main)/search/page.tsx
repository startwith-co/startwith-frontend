import SearchPage from '@/views/search/ui/search-page';
import getSolutionList from './api/getSolutionList';

const categoryMap: Record<string, string> = {
  '불량 검출·예측(비전 검사)': 'DEFECT_INSPECTION',
  '설비 이상 및 고장 예측(예지보전)': 'PREDICTIVE_MAINTENANCE',
  '실시간 공정 상태 모니터링(공정 이상 감지)': 'PROCESS_MONITORING',
  'MES 재고관리(공정 재고관리)': 'MES_INVENTORY_MANAGEMENT',
};
const INDUSTRY_MAP: Record<string, string> = {
  '금속 / 기계 / 자동차 부품 제조': 'Metal',
  '금형 / 정밀가공 제조': 'Mold',
  '식음료 / 식품 / 포장 제조': 'Food',
  '전자 / 전기 / 배터리 제조': 'Electronics',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { category, industry, budget, page, keyword } = await searchParams;
  const solutions = await getSolutionList({
    category: categoryMap[category as string],
    industry: INDUSTRY_MAP[industry as string],
    budget,
    page,
    keyword,
  });

  return (
    <SearchPage
      solutions={solutions}
      category={categoryMap[category as string]}
      industry={industry || ''}
      budget={budget || ''}
    />
  );
}
