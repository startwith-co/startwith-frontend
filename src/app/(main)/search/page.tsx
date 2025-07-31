import SearchPage from '@/views/search/ui/search-page';
import getSolutionList from './api/getSolutionList';

const categoryMap: Record<string, string> = {
  '불량 검출 · 예측(비전 검사)': 'DEFECT_INSPECTION',
  '설비 이상 및 고장 예측(예지보전)': 'PREDICTIVE_MAINTENANCE',
  '실시간 공정 상태 모니터링(공정 이상 감지)': 'PROCESS_MONITORING',
  'MES 재고관리(공정 재고관리)': 'MES_INVENTORY_MANAGEMENT',
};

const industryMap: Record<string, string> = {
  범용: 'BASIC',
  '금속/기계/자동차 부품 제조': 'METAL',
  '금형/정밀가공 제조': 'MOLD',
  '식음료/식품/포장 제조': 'FOOD',
  '전자·전기·배터리 제조': 'ELECTRONIC',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { category, industry, budget, page, keyword } = await searchParams;

  const mappedCategory = category
    ? categoryMap[category] || category
    : undefined;
  const mappedIndustry = industry
    ? industryMap[industry] || industry
    : undefined;

  console.log('category', mappedCategory, 'industry', mappedIndustry);

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
