'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import loginPost from '@/features/login/api/loginPost';
import { Button } from '@/shared/ui/button';
import CustomModal from '@/shared/ui/custommodal';
import { useState } from 'react';

const schema = z.object({
  company: z.string().min(1, '기업명(사업자명) 입력해주세요.'),
  email: z.string().min(1, '이메일 입력해주세요.'),
  code: z.string().min(1, '인증코드 입력해주세요.'),
});

type FormSchema = z.infer<typeof schema>;

/**
 * TODO: 추후 수정 필요
 */
function ForgetForm() {
  const {
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const [open, setOpen] = useState(false);
  return (
    <SignupForm
      action={loginPost}
      buttonProps="bg-gradient-to-t from-[#6E86FF] to-[#5B76FF] text-white w-full h-[55px] font-bold text-sm mt-4 "
      buttonName="비밀번호 찾기"
      buttonWrapperClassName="flex justify-center"
      loadingText="인증 중.."
      formProps="border-0 space-y-4 w-[500px]"
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
        {errors.company && (
          <p className="text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>
      <div className="grid w-full grid-cols-[3fr_1fr] items-center justify-between gap-3">
        <div>
          <Input
            id="email"
            type="string"
            {...register('email')}
            name="email"
            placeholder="이메일 입력"
            className="h-[45px] w-full bg-white indent-2 text-black"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="button"
          variant="login"
          asChild={false}
          onClick={() => setOpen(true)}
          className="h-[45px] w-full rounded-sm bg-white text-sm font-bold text-[#5B76FF] shadow-sm"
        >
          인증코드 전송
        </Button>
      </div>
      <div className="grid w-full grid-cols-[3fr_1fr] items-center justify-between gap-3">
        <div>
          <Input
            id="code"
            type="string"
            {...register('code')}
            name="code"
            placeholder="인증코드 입력"
            className="h-[45px] w-full bg-white indent-2 text-black"
          />
          {errors.code && (
            <p className="text-sm text-red-500">{errors.code.message}</p>
          )}
        </div>
        <Button
          type="button"
          variant="login"
          asChild={false}
          onClick={() => {}}
          className="h-[45px] w-full rounded-sm bg-white text-sm font-bold text-[#5B76FF] shadow-sm"
        >
          인증하기
        </Button>
        <CustomModal
          open={open}
          setOpen={setOpen}
          title="인증코드가 전송되었습니다."
          contentProps="border-0 space-y-1 w-[500px]"
          titleProps="text-2xl font-bold text-center text-[#5B76FF]"
          subTitleDescription="메일에서 6자리 코드를 확인해주세요"
        >
          <Button
            onClick={() => setOpen(false)}
            type="button"
            asChild={false}
            className="h-[50px] bg-gradient-to-t from-[#6E86FF] to-[#5B76FF] text-white"
          >
            확인
          </Button>
        </CustomModal>
      </div>
    </SignupForm>
  );
}

export default ForgetForm;
