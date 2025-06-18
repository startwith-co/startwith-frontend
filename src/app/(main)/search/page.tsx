import SearchPage from '@/views/search/ui/search-page';
import getSolutionList from './api/getSolutionList';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { category, industry, budget, page, keyword } = await searchParams;
  const solutions = await getSolutionList({
    category,
    industry,
    budget,
    page,
    keyword,
  });

  return (
    <SearchPage
      solutions={solutions}
      category={category as string}
      industry={industry as string}
      budget={budget as string}
    />
  );
}
