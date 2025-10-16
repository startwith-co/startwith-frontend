'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import forgetPost from '@/features/forget/api/forgetPost';
import ErrorMessage from '@/shared/ui/error-message';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';

const schema = z.object({
  company: z.string().min(1, '기업명(사업자명) 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
});

type FormSchema = z.infer<typeof schema>;

/**
 * TODO: 추후 수정 필요
 */
function ForgetForm() {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const [isVendor, setIsVendor] = useState(false);

  return (
    <SignupForm
      action={(prevState, formData) =>
        forgetPost(isVendor, prevState, formData)
      }
      buttonProps="bg-gradient-to-t from-[#6E86FF] to-[#5B76FF] text-white w-full h-[55px] font-bold text-sm mt-4 "
      buttonName="이메일로 비밀번호 재설정 링크 전송"
      buttonWrapperClassName="flex justify-center"
      formProps="border-0 space-y-4 w-[500px]"
      disabled={!isValid}
    >
      <div>
        <Input
          id="company"
          type="string"
          {...register('company')}
          name="company"
          placeholder="기업명(사업자명)"
          className="h-[45px] w-full bg-white indent-2 text-black"
        />
        {errors.company && <ErrorMessage message={errors.company.message} />}
      </div>

      <div>
        <Input
          id="email"
          type="string"
          {...register('email')}
          name="email"
          placeholder="이메일 입력"
          className="h-[45px] w-full bg-white indent-2 text-black"
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          asChild={false}
          type="button"
          variant="bgBlueGradient"
          className={`h-[45px] cursor-pointer text-sm font-bold shadow-lg transition ${
            isVendor ? 'scale-102 ring-2 ring-blue-500' : 'opacity-60'
          }`}
          onClick={() => setIsVendor(true)}
        >
          벤더 비밀번호 재설정
        </Button>
        <Button
          asChild={false}
          type="button"
          variant="textBlue"
          className={`h-[45px] cursor-pointer text-sm font-bold shadow-lg transition ${
            !isVendor ? 'scale-102 ring-2 ring-blue-500' : 'opacity-60'
          }`}
          onClick={() => setIsVendor(false)}
        >
          기업 고객 비밀번호 재설정
        </Button>
      </div>
    </SignupForm>
  );
}

export default ForgetForm;
