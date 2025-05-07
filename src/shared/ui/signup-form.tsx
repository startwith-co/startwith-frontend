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

/**
 *
 * @param buttonName
 * @param buttonProps
 * @param children
 * @param action
 * @param formProps
 * @param buttonWrapperClassName
 * @param loadingText
 * @param loadingTextProps
 * @param variant
 * @returns
 */

function SignupForm({
  action,
  buttonName,
  children,
  buttonProps,
  formProps,
  loadingText,
  variant,
  loadingTextProps,
  buttonWrapperClassName = '',
  disabled,
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
          loadingTextProps={loadingTextProps}
          variant={variant || 'default'}
          disabled={disabled}
        />
      </div>
    </form>
  );
}

export default SignupForm;
