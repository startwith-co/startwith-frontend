'use client';

import { ReactNode, useActionState } from 'react';
import SubmitCustomButton from './submit-custom-button';

interface SignupFormProps {
  buttonName: string;
  buttonProps: string;
  children: ReactNode;
  action: (prevState: void, formData: FormData) => Promise<void>;
  formProps?: string;
  buttonWrapperClassName?: string;
  loadingText?: string;
}

function SignupForm({
  action,
  buttonName,
  children,
  buttonProps,
  formProps,
  loadingText,
  buttonWrapperClassName = '',
}: SignupFormProps) {
  const [state, formAction] = useActionState(action, undefined);

  return (
    <form action={formAction} className={`${formProps || 'space-y-6'}`}>
      {children}
      <div className={buttonWrapperClassName}>
        <SubmitCustomButton
          buttonName={buttonName}
          buttonProps={buttonProps}
          loadingText={loadingText || '로딩 중'}
        />
      </div>
    </form>
  );
}

export default SignupForm;
