import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Solu from '@/shared/ui/solu';

function HomeSecondSection() {
  return (
    <section className="flex w-screen flex-col items-center justify-center gap-5 bg-gradient-to-b pt-5">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-bold">
          아직도 수십 개의 솔루션을 직접 비교하고 계신가요?
        </h1>
        <Image
          src="/images/login-second.png"
          width={670}
          height={600}
          alt="login-second"
        />
        <p className="text-3xl font-bold">
          우리 기업에게 꼭 맞는 솔루션은 무엇인지
          <br />
          <Solu />가 대신 분석해서 제안해드려요
        </p>
      </div>
      <div className="flex h-[500px] w-full flex-col items-center gap-5 pt-10">
        <p className="text-3xl font-bold">
          <span className="font-bold">ERP, CRM, HRM </span>등 우리 기업에게 꼭
          맞는
          <br /> 프리미엄 기업 솔루션은 <Solu />에 있습니다
        </p>
        <Button
          asChild
          type="button"
          variant="bgBlueGradient"
          className="mt-4 h-[60px] w-[550px] text-sm font-bold shadow-lg"
        >
          <Link href="#top">지금 바로 SOLU 시작하기</Link>
        </Button>
      </div>
    </section>
  );
}

export default HomeSecondSection;
