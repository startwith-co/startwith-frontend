import MainSectionInput from '@/features/home/ui/main-section-input';
import HomeSolutionSection from '@/entities/home/ui/home-solution-section';

function HomePage() {
  return (
    <section className="flex w-screen flex-col items-center overflow-x-hidden">
      <h1 className="mt-30 text-center text-4xl font-bold" id="top">
        <span className="text-[#0066FF]">가장 쉬운</span> 비지니스 문제 해결
        플랫폼
      </h1>
      <br />
      <p className="mb-10 text-center font-bold">
        비즈니스 문제 해결을 위한 온라인 솔루션을{' '}
        <span className="text-[#0066FF]">인스트루머</span>에서 지금 바로
        확인해보세요.
      </p>
      <MainSectionInput />
      <HomeSolutionSection />
    </section>
  );
}
export default HomePage;
