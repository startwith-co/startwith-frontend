import { Button } from '@/shared/ui/button';
import Link from 'next/link';

function SignupPopup() {
  return (
    <main className="flex h-[200px] w-[500px] flex-col items-center rounded-md bg-white p-7 shadow-sm">
      <h1 className="mb-5 text-xl font-bold text-[#5b5bff]">
        신청이 완료되었습니다.
      </h1>
      <p className="mb-5 text-center text-sm leading-2.5 whitespace-pre-line">{`내부 검토 후 이메일로 참가 코드와 함께 이용 안내 도와드리겠습니다.
\n 저희 SOLU와 함께해주셔서 진심으로 감사드립니다.`}</p>
      <Button
        variant="login"
        asChild
        className="h-[50px] w-[400px] rounded-sm bg-[#5B76FF] text-white"
      >
        <Link href="/login"> 확인</Link>
      </Button>
    </main>
  );
}
export default SignupPopup;
