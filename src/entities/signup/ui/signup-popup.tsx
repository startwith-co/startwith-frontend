import { Button } from '@/shared/ui/button';
import Link from 'next/link';

function SignupPopup() {
  return (
    <main className="flex h-[200px] w-[500px] flex-col items-center rounded-md bg-white p-7 shadow-sm">
      <h1 className="mb-1 text-xl font-bold text-[#5b5bff]">
        회원가입이 완료되었습니다.
      </h1>
      <p className="mb-5 text-center text-sm">지금 바로 SOLU를 이용해보세요!</p>
      <Button
        variant="login"
        asChild
        className="h-[50px] w-full rounded-sm bg-gradient-to-t from-[#5B76FF] to-[#6E86FF] text-white"
      >
        <Link href="/login"> 확인</Link>
      </Button>
    </main>
  );
}
export default SignupPopup;
