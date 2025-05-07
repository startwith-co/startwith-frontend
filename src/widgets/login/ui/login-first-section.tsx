import LoginControl from '@/features/login/ui/login-control';
import LoginCustomSection from '@/entities/login/ui/login-custom-section';

function LoginFirstSection() {
  return (
    <div className="grid h-auto w-screen grid-cols-2">
      <LoginControl />
      <LoginCustomSection />
    </div>
  );
}

export default LoginFirstSection;
