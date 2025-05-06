'use server';

import { redirect } from 'next/navigation';

async function editInfoPost(
  _prevState: void,
  formData: FormData,
  file: File | null,
): Promise<void> {
  const company = formData?.get('company') as string;
  const industry = formData?.get('industry') as string;
  const email = formData?.get('email') as string;

  const phoneNumber = formData?.get('phoneNumber') as string;
  if (!company || company.trim().length === 0) {
    return;
  }
  if (!industry || industry.trim().length === 0) {
    return;
  }
  if (!email || email.trim().length === 0) {
    return;
  }
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    return;
  }

  redirect('/');
}

export default editInfoPost;
