import LoginThirdLeftSection from '@/entities/login/ui/login-third-left-section';
import LoginThirdRightSection from '@/entities/login/ui/login-third-right-section';

function LoginThirdSection() {
  return (
    <div className="grid h-auto w-screen grid-cols-2">
      <LoginThirdLeftSection />
      <LoginThirdRightSection />
    </div>
  );
}

export default LoginThirdSection;
