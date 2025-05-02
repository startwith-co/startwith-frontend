'use client';

import { ReactNode, useActionState } from 'react';
import FormSubmit from './FormSubmit';
import { StateProps } from '../model/type';

interface SignupFormProps {
  buttonName: string;
  buttonProps: string;
  children: ReactNode;
  action: (prevState: StateProps, formData: FormData) => Promise<StateProps>;
}

function SignupForm({
  action,
  buttonName,
  children,
  buttonProps,
}: SignupFormProps) {
  const [state, formAction] = useActionState(action, { errors: [] });
  return (
    <form action={formAction} className="space-y-6">
      {children}
      <FormSubmit buttonName={buttonName} buttonProps={buttonProps} />
      {state.errors && (
        <ul className="text-sm text-red-500">
          {state.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SignupForm;
