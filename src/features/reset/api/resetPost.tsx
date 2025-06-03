'use server';

import { redirect } from 'next/navigation';

async function resetPost(_prevState: void, formData: FormData): Promise<void> {
  const password = formData?.get('password') as string;
  const confirmPassword = formData?.get('confirmPassword') as string;
  if (!password || password.trim().length === 0) {
    return;
  }

  redirect('/login');
}

export default resetPost;
