import SearchPage from '@/views/search/ui/search-page';
import { solutionCategoryToValue } from '@/shared/model/getCategoryList';
import getSolutionList from './api/getSolutionList';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { category, budget, page, keyword } = await searchParams;

  const mappedCategory = category
    ? solutionCategoryToValue[category] || category
    : undefined;

  const solutions = await getSolutionList({
    category: mappedCategory,
    budget,
    page,
    keyword,
  });

  return (
    <SearchPage
      solutions={solutions}
      category={category || ''}
      budget={budget || ''}
    />
  );
}
