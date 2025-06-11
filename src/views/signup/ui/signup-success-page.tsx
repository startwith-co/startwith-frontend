import SignupLayout from '@/entities/signup/ui/signup-layout';
import SignupPopup from '@/entities/signup/ui/signup-popup';

function SignupSuccessPage() {
  return (
    <SignupLayout title="우리 기업을 위한 단 하나의 기업 솔루션 플랫폼, SOLU">
      <SignupPopup />
    </SignupLayout>
  );
}

export default SignupSuccessPage;
