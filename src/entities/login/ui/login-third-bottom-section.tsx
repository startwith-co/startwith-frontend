import { Button } from '@/shared/ui/button';
import Link from 'next/link';

function LoginThirdBottomSection() {
  return (
    <section className="bg-[white ] flex h-[400px] w-screen flex-col items-center justify-center gap-5 pt-5">
      <h1 className="text-center text-2xl font-bold">
        시간 낭비 없는 솔루션 탐색, <br />
        이제
        <span className="font-extrabold text-[#4f7df9]">SOLU</span>에서 간편하게
        찾아보세요
      </h1>
      <Button
        asChild
        variant="ghost"
        className="h-[50px] w-[350px] rounded-sm bg-white text-[#4f7df9] shadow-lg"
      >
        <Link href="/signup/user">
          기업 고객으로 회원가입하고, 솔루션 탐색하기
        </Link>
      </Button>
    </section>
  );
}

export default LoginThirdBottomSection;
