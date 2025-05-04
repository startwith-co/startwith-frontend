'use server';

import { redirect } from 'next/navigation';

async function loginPost(_prevState: void, formData: FormData): Promise<void> {
  const email = formData?.get('email') as string;
  const password = formData?.get('password') as string;

  if (!email || email.trim().length === 0) {
    return;
  }
  if (!password || password.trim().length === 0) {
    return;
  }

  redirect('/');
}

export default loginPost;
