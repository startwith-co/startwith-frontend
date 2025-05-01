'use client';

import { Button } from '@/shared/ui/button';
import { useFormStatus } from 'react-dom';

interface FormSubmitProps {
  buttonName: string;
  buttonProps: string;
}
export default function FormSubmit({
  buttonName,
  buttonProps,
}: FormSubmitProps) {
  const status = useFormStatus();

  if (status.pending) {
    return <p className="text-sm font-bold">신청 중...</p>;
  }

  return (
    <Button
      asChild={false}
      type="submit"
      variant="login"
      className={`text-md h-[70px] w-[600px] rounded-md border font-bold ${buttonProps} shadow-md`}
    >
      {buttonName}
    </Button>
  );
}
