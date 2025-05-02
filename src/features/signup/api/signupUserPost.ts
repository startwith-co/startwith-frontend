'use server';

import { redirect } from 'next/navigation';

async function signupUserPost(
  _prevState: void,
  formData: FormData,
): Promise<void> {
  const company = formData?.get('company') as string;
  const industry = formData?.get('industry') as string;
  const email = formData?.get('email') as string;

  if (!company || company.trim().length === 0) {
    return;
  }
  if (!industry || industry.trim().length === 0) {
    return;
  }
  if (!email || email.trim().length === 0) {
    return;
  }

  redirect('/signup/success');
}

export default signupUserPost;
