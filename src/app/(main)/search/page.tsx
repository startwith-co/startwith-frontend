import SearchPage from '@/pages/search/ui/search-page';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category, industry, budget, page, keyword } = await searchParams;

  return (
    <SearchPage
      category={category as string}
      industry={industry as string}
      budget={budget as string}
      page={page as string}
      keyword={keyword as string}
    />
  );
}
