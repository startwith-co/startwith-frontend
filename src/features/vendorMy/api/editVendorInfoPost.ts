'use server';

import { redirect } from 'next/navigation';

async function editVendorInfoPost(
  _prevState: void,
  formData: FormData,
): Promise<void> {
  const company = formData?.get('company') as string;
  const email = formData?.get('email') as string;
  const phoneNumber = formData?.get('phoneNumber') as string;
  const accountNumber = formData?.get('accountNumber') as string;
  const bankName = formData?.get('bankName') as string;

  if (!company || company.trim().length === 0) {
    return;
  }

  if (!email || email.trim().length === 0) {
    return;
  }
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    return;
  }
  if (!accountNumber || accountNumber.trim().length === 0) {
    return;
  }
  if (!bankName || bankName.trim().length === 0) {
    return;
  }

  redirect('/');
}

export default editVendorInfoPost;
