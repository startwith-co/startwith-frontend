import LoginButtonSection from './login-button-section';

function LoginControl() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-t from-[#F4F8FF] to-[#DBE8FF]">
      <div className="space-y-6">
        <h1 className="mb-3 text-4xl font-bold text-[#6E86FF]">SOLU</h1>
        <h1 className="text-3xl font-extrabold text-[#2b2b2b]">
          비지니스 성장을 위한 최고의 SaaS,
          <br />
          지금 바로 찾아보세요.
        </h1>
        <p className="text-sm text-gray-500">
          검증된 수많은 SaaS를 비교하고, 최적의 SaaS를 찾아 비지니스를 더 빠르게
          성장시켜보세요.
        </p>
        <LoginButtonSection />
      </div>
    </div>
  );
}

export default LoginControl;
