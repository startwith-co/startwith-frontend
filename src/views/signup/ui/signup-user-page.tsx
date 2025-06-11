'use client';

import SignupLayout from '@/entities/signup/ui/signup-layout';
import SignupUserForm from '@/features/signup/ui/signup-user-form';

function SignupUserPage() {
  return (
    <SignupLayout
      title="프리미엄 기업 솔루션은 SOLU에 있습니다"
      content="지금 바로 귀사에 꼭 필요한 ERP, CRM, HRM 기업 솔루션을 찾아보세요"
      description="기업 고객 회원 가입"
    >
      <SignupUserForm />
    </SignupLayout>
  );
}
export default SignupUserPage;
