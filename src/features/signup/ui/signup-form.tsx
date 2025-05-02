'use client';

import { ReactNode, useActionState } from 'react';
import FormSubmit from './FormSubmit';
import { StateProps } from '../model/type';

interface SignupFormProps {
  buttonName: string;
  buttonProps: string;
  children: ReactNode;
  action: (prevState: void, formData: FormData) => Promise<void>;
}

function SignupForm({
  action,
  buttonName,
  children,
  buttonProps,
}: SignupFormProps) {
  const [state, formAction] = useActionState(action, undefined);
  return (
    <form action={formAction} className="space-y-6">
      {children}
      <FormSubmit buttonName={buttonName} buttonProps={buttonProps} />
    </form>
  );
}

export default SignupForm;
