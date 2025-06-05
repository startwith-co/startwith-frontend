'use client';

import { ReactNode, useActionState, FormEvent } from 'react';
import SubmitCustomButton from './submit-custom-button';

/**
 * @description
 * 서버 액션을 사용할 때는 action prop을 사용하고,
 * 클라이언트 액션을 사용할 때는 onSubmit prop을 사용합니다.
 *
 * @example
 * ```tsx
 * <SignupForm
 *   action={signupUserPost}
 *   buttonName="가입하기"
 *   buttonProps="bg-gradient-to-r from-[#2D2D2D] to-[#404040] text-white w-full h-[60px] font-extrabold text-lg shadow-sm mb-8 mt-5"
 *   disabled={!isValid}
 * />
 * ```
 *
 */

interface SignupFormProps {
  buttonName: string;
  buttonProps: string;
  children: ReactNode;
  action: (prevState: void, formData: FormData) => Promise<void> | void;
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
  isServerAction?: boolean;
}

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
  isServerAction = true,
}: SignupFormProps) {
  const [state, formAction] = useActionState(action, undefined);

  const handleClientSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await action(undefined, formData);
  };

  return (
    <form
      {...(isServerAction
        ? { action: formAction }
        : { onSubmit: handleClientSubmit })}
      className={formProps || 'space-y-6'}
    >
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
