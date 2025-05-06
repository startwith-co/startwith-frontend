'use server';

import { redirect } from 'next/navigation';

async function signupVendorPost(
  _prevState: void,
  formData: FormData,
  file: File | null,
): Promise<void> {
  const company = formData?.get('company') as string;
  const phoneNumber = formData?.get('phoneNumber') as string;
  const email = formData?.get('email') as string;
  const name = formData?.get('name') as string;
  const password = formData?.get('password') as string;

  if (!company || company.trim().length === 0) {
    return;
  }
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    return;
  }
  if (!email || email.trim().length === 0) {
    return;
  }
  if (!name || name.trim().length === 0) {
    return;
  }
  if (!password || password.trim().length === 0) {
    return;
  }

  redirect('/signup/success');
}

export default signupVendorPost;
