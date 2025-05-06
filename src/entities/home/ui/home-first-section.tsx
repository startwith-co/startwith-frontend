import Image from 'next/image';
import CommonBoxList from '@/shared/ui/commonboxlist';

function HomeFirstSection() {
  return (
    <section className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[#F8F4FF] to-[#F4F8FF]">
      <div className="relative flex h-screen w-[900px] flex-col items-center justify-center gap-5">
        <div className="absolute left-[1px] z-10 flex w-[450px] flex-col items-center justify-center gap-5">
          <h1 className="text-3xl font-bold">
            기업 솔루션 탐색,
            <br />
            이제 <span className="text-3xl text-[#4f7df9]">SOLU</span>에서
            간편하게 찾아보세요
          </h1>
          <Image
            src="/images/login-third.png"
            width={330}
            height={400}
            alt="login-third-left"
          />
        </div>
        <CommonBoxList boxProps="flex h-screen flex-col items-center justify-center pt-5 absolute right-[50px]" />
      </div>
    </section>
  );
}

export default HomeFirstSection;
