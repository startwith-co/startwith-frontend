'use server';

import { redirect } from 'next/navigation';

async function signupVendorPost(
  _prevState: void,
  formData: FormData,
): Promise<void> {
  const company = formData?.get('company') as string;
  const phoneNumber = formData?.get('phoneNumber') as string;
  const email = formData?.get('email') as string;

  if (!company || company.trim().length === 0) {
    return;
  }
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    return;
  }
  if (!email || email.trim().length === 0) {
    return;
  }

  redirect('/signup/success');
}

export default signupVendorPost;
