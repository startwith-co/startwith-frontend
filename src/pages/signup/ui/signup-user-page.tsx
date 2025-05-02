'use client';

import SignupLayout from '@/pages/signup/ui/signup-layout';
import SignupUserForm from '@/features/signup/ui/signup-user-form';

function SignupUserPage() {
  return (
    <SignupLayout
      title="프리미엄 기업 솔루션은 SOLU에 있습니다"
      content={`기업 고객 등록 신청을 통해 \n 귀사에 꼭 필요한 EPR, CRM, HRM 솔루션을 찾아보세요`}
      description="수요 기업 기본 정보 작성"
    >
      <SignupUserForm />
    </SignupLayout>
  );
}
export default SignupUserPage;
