'use server';

import { redirect } from 'next/navigation';
import { StateProps } from '../model/type';

async function signupVendorPost(
  _prevState: StateProps,
  formData: FormData,
): Promise<StateProps> {
  const company = formData?.get('company') as string;
  const phoneNumber = formData?.get('phoneNumber') as string;
  const email = formData?.get('email') as string;

  const errors: string[] = [];
  if (!company || company.trim().length === 0) {
    errors.push('기업명 입력해 주세요.');
  }
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    errors.push('전화번호 입력해 주세요.');
  }
  if (!email || email.trim().length === 0) {
    errors.push('이메일 입력해 주세요.');
  }

  if (errors.length > 0) {
    return { errors };
  }

  redirect('/signup/success');
}

export default signupVendorPost;
