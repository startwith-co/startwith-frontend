'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input'; // ← 사용자 정의 Input 컴포넌트
import { signIn } from 'next-auth/react';
import { Button } from '@/shared/ui/button'; // ← 사용자 정의 Button 컴포넌트
import Link from 'next/link';

const schema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export type FormSchema = z.infer<typeof schema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  // ✅ 유효한 폼 제출 시 실행
  const onValid = async (data: FormSchema) => {
    await signIn('credentials', {
      callbackUrl: '/',
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="w-full border-0">
      <div>
        <Input
          id="email"
          type="email"
          {...register('email')}
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
          placeholder="비밀번호 입력"
          className="h-[40px] w-full rounded-t-none rounded-b-md border border-t border-[#7A7A7A] indent-2 text-black"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <p className="mt-2 text-sm text-[#A7A7A7]">
        <Link href="/forget">비밀번호를 잃어버렸어요?</Link>
      </p>

      <div className="flex justify-center">
        <Button
          asChild={false}
          type="submit"
          variant="bgBlueGradient"
          className="mt-4 h-[55px] w-full cursor-pointer text-sm font-bold shadow-lg"
          disabled={!isValid}
        >
          로그인
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
