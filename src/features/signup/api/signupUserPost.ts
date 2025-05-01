'use server';

import { redirect } from 'next/navigation';
import { StateProps } from '../model/type';

async function signupUserPost(
  prevState: StateProps,
  formData: FormData,
): Promise<StateProps> {
  const company = formData?.get('company') as string;
  const industry = formData?.get('industry') as string;
  const email = formData?.get('email') as string;

  const errors: string[] = [];
  if (!company || company.trim().length === 0) {
    errors.push('기업명 입력해 주세요.');
  }
  if (!industry || industry.trim().length === 0) {
    errors.push('산업 종사군 입력해 주세요.');
  }
  if (!email || email.trim().length === 0) {
    errors.push('담당자 이메일 입력해 주세요.');
  }

  if (errors.length > 0) {
    return { errors };
  }

  redirect('/signup/success');
}

export default signupUserPost;
