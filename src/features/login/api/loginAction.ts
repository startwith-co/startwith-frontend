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
    });
    return { success: true };
  } catch (e) {
    return { success: false, message: '아이디 비밀번호를 확인해주세요.' };
  }
}
