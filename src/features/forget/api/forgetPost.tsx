'use server';

import postResetLink from './postResetLink';

async function forgetPost(
  isVendor: boolean,
  _prevState: void,
  formData: FormData,
): Promise<void> {
  const email = formData?.get('email') as string;
  const company = formData?.get('company') as string;

  if (!email || email.trim().length === 0) {
    return;
  }
  if (!company || company.trim().length === 0) {
    return;
  }

  await postResetLink(isVendor, email, company);
}

export default forgetPost;
