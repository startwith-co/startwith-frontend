'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import loginPost from '@/features/login/api/loginPost';
import Link from 'next/link';

const schema = z.object({
  email: z.string().min(1, '이메일 입력해주세요.'),
  password: z.string().min(1, '비밀번호 입력해주세요.'),
});

type FormSchema = z.infer<typeof schema>;

function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  return (
    <SignupForm
      action={loginPost}
      buttonProps="bg-white text-black w-full h-[55px] font-light text-sm mt-4 shadow-lg"
      buttonName="로그인"
      buttonWrapperClassName="flex justify-center"
      loadingText="로그인 중.."
      formProps="w-full border-0"
    >
      <div>
        <Input
          id="email"
          type="string"
          {...register('email')}
          name="email"
          placeholder="이메일 입력"
          className="h-[40px] w-full rounded-t-md rounded-b-none border border-b-0 border-[#7A7A7A] indent-2 text-black"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          id="password"
          type="password"
          {...register('password')}
          name="password"
          placeholder="비밀번호 입력"
          className="h-[40px] w-full rounded-t-none rounded-b-md border border-t-1 border-[#7A7A7A] indent-2 text-black"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <p className="mt-2 text-sm text-[#A7A7A7]">
        <Link href="/forget">비밀번호를 잃어버렸어요?</Link>
      </p>
    </SignupForm>
  );
}

export default LoginForm;
