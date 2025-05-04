import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

function LoginFourthSection() {
  return (
    <section className="relative flex h-[1600px] flex-col items-center justify-center bg-[#212121]">
      <div className="absolute top-0 h-[500px] w-full bg-gradient-to-b from-[#FCFCFC] to-[#212121]" />
      <div>
        <div className="h-[550px] w-full bg-[#212121]" />
        <h1 className="text-4xl leading-20 font-bold text-white">
          프리미엄 기업 솔루션이 빛날 수 있는 이곳, <br />{' '}
          <span className="text-5xl font-extrabold">SOLU</span>
        </h1>
        <div className="relative mt-70 flex w-[800px] flex-col items-center justify-center gap-5">
          <Image
            className="absolute top-[-120px] right-0"
            src="/images/login-fourth.png"
            width={130}
            height={130}
            alt="login-fourth"
          />
          <p className="text-3xl text-white">
            SOLU는 귀사의 솔루션을 기업 고객에게 정확히 매칭합니다
          </p>
          <p className="text-4xl text-white">
            이제, 귀사의 솔루션이 선택될 차례입니다
          </p>
          <Button
            asChild
            className="h-[55px] w-[600px] bg-gradient-to-b from-[#2D2D2D] to-[#404040] text-sm font-bold"
          >
            <Link href="/signup/vendor">
              밴더로 회원가입하고, 솔루션 공급사로 파트너쉽 시작하기
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LoginFourthSection;
