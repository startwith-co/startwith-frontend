import CustomModal from '@/shared/ui/custommodal';
import LoginForm from './login-form';

export default function LoginModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="로그인"
      contentProps="flex h-auto w-[500px] flex-col items-center justify-center rounded-2xl border-0 bg-white px-7 py-8"
      titleProps="mt-10 text-center text-xl font-bold text-black"
    >
      <LoginForm />
    </CustomModal>
  );
}
