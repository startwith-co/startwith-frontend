import LoginFirstSection from '@/widgets/login/ui/login-first-section';
import LoginSecondSection from '@/entities/login/ui/login-second-section';
import LoginThirdSection from '@/widgets/login/ui/login-third-section';
import LoginFourthSection from '@/entities/login/ui/login-fourth-section';
import LoginThirdBottomSection from '@/entities/login/ui/login-third-bottom-section';

function LoginPage() {
  return (
    <div className="h-auto w-screen overflow-x-hidden">
      <LoginFirstSection />
      <LoginSecondSection />
      <LoginThirdSection />
      <LoginThirdBottomSection />
      <LoginFourthSection />
    </div>
  );
}

export default LoginPage;
