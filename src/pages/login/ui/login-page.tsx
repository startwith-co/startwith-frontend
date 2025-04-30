import { Button } from '@/shared/ui/button';

function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[#e9efff] to-[#f9f9f9]">
      <div className="space-y-6 px-6 text-center">
        <h1 className="mb-[20px] text-3xl font-bold text-[#4f7df9]">SOLU</h1>
        <h1 className="text-2xl font-extrabold text-[#2b2b2b]">
          검증된 프리미엄 기업 솔루션, 오직 인증된 기업만을 위해
        </h1>

        <p className="text-sm text-gray-500">
          플랫폼 참가 코드를 받은 기업만 베타 서비스를 이용하실 수 있습니다.
          <br />
          지금 당신의 기업에 꼭 맞는 ERP, CRM, HRM 솔루션을 찾아보세요.
        </p>

        <input
          type="text"
          placeholder="플랫폼 참가 코드를 입력해주세요."
          className="w-[700px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-md focus:outline-none"
        />

        <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
          <Button
            asChild={false}
            variant="login"
            size="login"
            className="bg-[#4f7df9] text-white shadow-md"
          >
            <span className="text-sm font-bold">
              솔루션 공급사로 파트너십 시작
            </span>
            <span className="text-xs text-gray-200">(벤더 전용)</span>
          </Button>

          <Button
            asChild={false}
            variant="login"
            size="login"
            className="border border-gray-200 bg-white text-[#4f7df9] shadow-md"
          >
            <span className="text-sm font-bold">기업 고객 등록 신청</span>
            <span className="text-xs text-gray-400">(기업 고객 전용)</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
