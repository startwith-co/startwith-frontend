import MainSectionButtons from '@/features/home/ui/main-section-buttons';
import HomeSecondSection from '@/entities/home/ui/home-second-section';
import HomeFirstSection from '@/entities/home/ui/home-first-section';

function HomePage() {
  return (
    <section className="flex w-screen flex-col items-center overflow-x-hidden bg-gradient-to-t from-[#F4F8FF] to-[#F8F4FF]">
      <h1 className="mt-20 text-center text-xl font-bold" id="top">
        온라인 셀러부터 중소규모 IT 기업까지,
        <br />
        온라인 비지니스를 위해 SaaS를 가장 쉽고 빠르게 도입할 수 있는 채널,
        <span className="text-[#0066FF]">SOLU</span>
      </h1>
      <h2 className="mt-4 text-2xl font-bold">
        <span className="text-[#0066FF]">어떤 SaaS</span>를 찾고 계신가요?
      </h2>
      <MainSectionButtons />
      <HomeFirstSection />
      <HomeSecondSection />
    </section>
  );
}
export default HomePage;
