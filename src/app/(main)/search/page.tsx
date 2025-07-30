import SearchPage from '@/views/search/ui/search-page';
import getSolutionList from './api/getSolutionList';

const categoryMap: Record<string, string> = {
  '불량 검출 · 예측(비전 검사)': 'DEFECT_INSPECTION',
  '설비 이상 및 고장 예측(예지보전)': 'PREDICTIVE_MAINTENANCE',
  '실시간 공정 상태 모니터링(공정 이상 감지)': 'PROCESS_MONITORING',
  'MES 재고관리(공정 재고관리)': 'MES_INVENTORY_MANAGEMENT',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { category, industry, budget, page, keyword } = await searchParams;
  const solutions = await getSolutionList({
    category: categoryMap[category as string],
    industry,
    budget,
    page,
    keyword,
  });

  return (
    <SearchPage
      solutions={solutions}
      category={category || ''}
      industry={industry || ''}
      budget={budget || ''}
    />
  );
}
