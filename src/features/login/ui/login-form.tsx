'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import { signIn } from 'next-auth/react';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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

  const [target, setTarget] = useState<'vendor' | 'user'>('vendor');
  const router = useRouter();

  const onValid = async (data: FormSchema) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      target,
      redirect: false,
    });

    if (res?.error) {
      toast.error('로그인 실패: 아이디 또는 비밀번호를 확인해주세요.');
    } else if (res?.ok) {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="w-full border-0">
      <div className="relative w-full">
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder={errors.email ? '' : '이메일 입력'}
          className="h-[40px] w-full rounded-t-md rounded-b-none border border-b-0 border-[#7A7A7A] indent-2 text-black"
        />
        {errors.email && (
          <span className="absolute bottom-3 left-5 text-xs text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="relative w-full">
        <Input
          id="password"
          type="password"
          {...register('password')}
          placeholder={errors.password ? '' : '비밀번호 입력'}
          className={`h-[40px] w-full rounded-t-none rounded-b-md border indent-2 text-black ${
            errors.password ? 'border-red-500' : 'border-[#7A7A7A]'
          }`}
        />
        {errors.password && (
          <span className="absolute bottom-3 left-5 text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-[#A7A7A7] underline">
        <Link href="/forget">비밀번호를 잃어버렸나요?</Link>
      </p>

      <div className="grid grid-cols-2 gap-2">
        <Button
          asChild={false}
          type="submit"
          variant="bgBlueGradient"
          className="mt-4 h-[55px] cursor-pointer text-sm font-bold shadow-lg"
          disabled={!isValid}
          onClick={() => setTarget('vendor')}
        >
          벤더로 로그인
        </Button>
        <Button
          asChild={false}
          type="submit"
          variant="bgBlackGradient"
          className="mt-4 h-[55px] cursor-pointer text-sm font-bold shadow-lg"
          disabled={!isValid}
          onClick={() => setTarget('user')}
        >
          기업 고객으로 로그인
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
