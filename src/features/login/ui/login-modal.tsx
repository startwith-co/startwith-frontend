import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import LoginForm from './login-form';

export default function LoginModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex h-auto w-[500px] flex-col items-center justify-center rounded-2xl border-0 bg-white px-7 py-8">
        <DialogHeader>
          <DialogTitle className="mt-10 text-center text-xl font-bold text-black">
            로그인
          </DialogTitle>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
