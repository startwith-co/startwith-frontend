'use server';

import { redirect } from 'next/navigation';
import signupUser from './signupUser';

async function signupUserPost(
  _prevState: void,
  formData: FormData,
  industry: string | undefined,
): Promise<void> {
  const company = formData?.get('company') as string;
  const email = formData?.get('email') as string;
  const password = formData?.get('password') as string;
  const confirmPassword = formData?.get('confirmPassword') as string;

  if (!company || company.trim().length === 0) {
    return;
  }
  if (!industry || industry.trim().length === 0) {
    return;
  }
  if (!email || email.trim().length === 0) {
    return;
  }
  if (!password || password.trim().length === 0) {
    return;
  }
  if (password !== confirmPassword) {
    return;
  }
  await signupUser(formData, industry);
  redirect('/signup/success');
}

export default signupUserPost;
