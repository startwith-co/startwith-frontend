import SignupLayout from '@/entities/signup/ui/signup-layout';
import ForgetForm from '@/features/forget/ui/forget-form';

function ForgetPage() {
  return (
    <SignupLayout
      title="우리 기업을 위한 단 하나의 기업 솔루션 플랫폼, SOLU"
      description="기본 정보 입력"
    >
      <ForgetForm />
    </SignupLayout>
  );
}

export default ForgetPage;
