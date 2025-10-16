'use client';

import { Button } from '@/shared/ui/button';
import { useFormStatus } from 'react-dom';
import Spinner from './spinner';

interface SubmitCustomButtonProps {
  buttonName: string;
  buttonProps: string;
  disabled?: boolean;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'login'
    | 'bgBlackGradient'
    | 'textBlue'
    | 'bgBlueGradient';
}
function SubmitCustomButton({
  buttonName,
  buttonProps,
  variant,
  disabled,
}: SubmitCustomButtonProps) {
  const status = useFormStatus();

  if (status.pending) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Button
      asChild={false}
      variant={variant}
      type="submit"
      className={`${buttonProps}`}
      disabled={disabled}
    >
      {buttonName}
    </Button>
  );
}

export default SubmitCustomButton;
