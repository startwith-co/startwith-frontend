import MainCategoryButtons from '@/features/home/ui/main-category-buttons';
import MainSectionButtons from '@/features/home/ui/main-section-buttons';
import HomeSecondSection from '@/entities/home/ui/home-second-section';
import HomeFirstSection from '@/entities/home/ui/home-first-section';

function HomePage() {
  return (
    <section className="flex w-screen flex-col items-center overflow-x-hidden bg-gradient-to-t from-[#F4F8FF] to-[#F8F4FF]">
      <h1 className="mt-20 text-xl" id="top">
        우리 기업을 위한 단 하나의 기업 솔루션 플랫폼,
        <span className="font-bold">SOLU</span>
      </h1>
      <h2 className="mt-5 text-2xl font-bold">어떤 솔루션을 찾고 계신가요?</h2>
      <MainSectionButtons />
      <h3 className="mt-25 text-lg font-bold">도입 예정 솔루션</h3>
      <MainCategoryButtons />
      <HomeFirstSection />
      <HomeSecondSection />
    </section>
  );
}
export default HomePage;
