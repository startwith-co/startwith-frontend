import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Solu from '@/shared/ui/solu';

function HomeSecondSection() {
  return (
    <section className="flex w-screen flex-col items-center justify-center gap-5 bg-gradient-to-b pt-5">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-bold">
          아직도 수십 개의 SaaS를 번거롭게{' '}
          <span className="text-[#4f7df9]">직접 찾고 계신가요?</span>
        </h1>
        <Image
          src="/images/login-second.png"
          width={670}
          height={600}
          alt="login-second"
        />
        <p className="text-center text-3xl leading-normal font-semibold">
          우리 회사에 꼭 필요한 SaaS는 무엇인지
          <br />
          <Solu />가 대신 모아서 보여드려요.
        </p>
      </div>
      <div className="flex h-[500px] w-full flex-col items-center gap-5 pt-10">
        <p className="text-center text-3xl leading-normal font-semibold">
          우리 회사에게 꼭 필요한 SaaS는 <Solu />에 있습니다
        </p>
        <Button
          asChild
          type="button"
          variant="bgBlueGradient"
          className="mt-4 h-[60px] w-[550px] text-lg font-bold shadow-lg"
        >
          <Link href="#top">지금 바로 SOLU 시작하기</Link>
        </Button>
      </div>
    </section>
  );
}

export default HomeSecondSection;
