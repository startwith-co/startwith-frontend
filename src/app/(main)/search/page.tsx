import SearchPage from '@/pages/search/ui/search-page';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { solutionCategory, industryCategory, budget, page } =
    await searchParams;

  return (
    <SearchPage
      solutionCategory={solutionCategory as string}
      industryCategory={industryCategory as string}
      budget={budget as string}
      page={page as string}
    />
  );
}
