'use client';

import { Button } from '@/shared/ui/button';
import { useFormStatus } from 'react-dom';

interface SubmitCustomButtonProps {
  buttonName: string;
  buttonProps: string;
  loadingText: string;
  loadingTextProps?: string;
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
  loadingText,
  loadingTextProps,
  variant,
  disabled,
}: SubmitCustomButtonProps) {
  const status = useFormStatus();

  if (status.pending) {
    return (
      <p className={loadingTextProps || 'text-sm font-bold'}>{loadingText}</p>
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
