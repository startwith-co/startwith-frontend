'use server';

import { signIn } from '@/auth';

export default async function loginAction({
  email,
  password,
  target,
}: {
  email: string;
  password: string;
  target: 'vendor' | 'user';
}) {
  try {
    await signIn('credentials', {
      redirect: false,
      email,
      password,
      target,
      redirectTo: '/',
    });
    return { ok: true, status: 200, message: '로그인 성공' };
  } catch (e) {
    return {
      ok: false,
      status: 400,
      message: '아이디 비밀번호를 확인해주세요.',
    };
  }
}
