'use client';

import { Button } from '@/shared/ui/button';
import { useFormStatus } from 'react-dom';

interface SubmitCustomButtonProps {
  buttonName: string;
  buttonProps: string;
  loadingText: string;
  loadingTextProps?: string;
}
function SubmitCustomButton({
  buttonName,
  buttonProps,
  loadingText,
  loadingTextProps,
}: SubmitCustomButtonProps) {
  const status = useFormStatus();

  if (status.pending) {
    return (
      <p className={loadingTextProps || 'text-sm font-bold'}>{loadingText}</p>
    );
  }

  return (
    <Button asChild={false} type="submit" className={`${buttonProps}`}>
      {buttonName}
    </Button>
  );
}

export default SubmitCustomButton;
