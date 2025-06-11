'use server';

import { redirect } from 'next/navigation';

async function forgetPost(_prevState: void, formData: FormData): Promise<void> {
  const email = formData?.get('email') as string;
  const company = formData?.get('company') as string;

  if (!email || email.trim().length === 0) {
    return;
  }
  if (!company || company.trim().length === 0) {
    return;
  }

  redirect('/forget/reset');
}

export default forgetPost;
