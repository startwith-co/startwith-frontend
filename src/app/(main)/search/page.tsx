import SearchPage from '@/views/search/ui/search-page';
import getSolutionList from './api/getSolutionList';

const categoryMap: Record<string, string> = {
  '불량 검출 · 예측': 'DEFECT_INSPECTION',
  '설비 이상 및 고장 예측': 'PREDICTIVE_MAINTENANCE',
  '실시간 공정 상태 모니터링': 'PROCESS_MONITORING',
  'MES 재고관리': 'MES_INVENTORY_MANAGEMENT',
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

  const mappedCategory = category
    ? categoryMap[category] || category
    : undefined;
  const mappedIndustry = industry
    ? INDUSTRY_MAP[industry] || industry
    : undefined;

  console.log('category', mappedCategory, 'industry', mappedIndustry);

  const solutions = await getSolutionList({
    category: mappedCategory,
    industry: mappedIndustry,
    budget,
    page,
    keyword,
  });

  return (
    <SearchPage
      solutions={solutions}
      category={mappedCategory || ''}
      industry={mappedIndustry || ''}
      budget={budget || ''}
    />
  );
}
