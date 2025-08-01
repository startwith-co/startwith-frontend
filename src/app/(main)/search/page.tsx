import SearchPage from '@/views/search/ui/search-page';
import { industryToEn } from '@/shared/model/industryMap';
import { categoryToEn } from '@/shared/model/categoryMap';
import getSolutionList from './api/getSolutionList';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { category, industry, budget, page, keyword } = await searchParams;

  const mappedCategory = category
    ? categoryToEn[category] || category
    : undefined;
  const mappedIndustry = industry
    ? industryToEn[industry] || industry
    : undefined;

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
      category={category || ''}
      industry={industry || ''}
      budget={budget || ''}
    />
  );
}
