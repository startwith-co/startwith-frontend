import SignupLayout from '@/entities/signup/ui/signup-layout';
import ResetForm from '@/features/reset/ui/reset-form';
import { Suspense } from 'react';

function ResetPage() {
  return (
    <SignupLayout
      title="우리 기업을 위한 단 하나의 기업 솔루션 플랫폼, SOLU"
      description="비밀번호 재설정"
    >
      <Suspense fallback={<p>Loading...</p>}>
        <ResetForm />
      </Suspense>
    </SignupLayout>
  );
}

export default ResetPage;
