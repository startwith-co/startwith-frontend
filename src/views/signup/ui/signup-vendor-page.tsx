'use client';

import SignupLayout from '@/entities/signup/ui/signup-layout';
import SignupVendorForm from '@/features/signup/ui/signup-vendor-form';

function SignupVendorPage() {
  return (
    <SignupLayout
      title="SOLU와 함께 성장할 파트너를 기다립니다"
      content={`검증된 기업 솔루션만 선별하여 고객과 연결합니다 \n 지금 당신의 솔루션을 고객에게 소개해 주세요`}
      description="밴더 회원가입"
    >
      <SignupVendorForm />
    </SignupLayout>
  );
}
export default SignupVendorPage;
