'use server';

import { revalidatePath } from 'next/cache';
import editInfo from './editInfo';

async function editInfoPost(
  _prevState: void,
  formData: FormData,
  file: File | null,
  selectedIndustry: string | undefined,
): Promise<void> {
  const company = formData?.get('company') as string;

  const email = formData?.get('email') as string;
  const phoneNumber = formData?.get('phoneNumber') as string;
  const password = formData?.get('password') as string;

  if (!company || company.trim().length === 0) {
    return;
  }
  if (!selectedIndustry || selectedIndustry.trim().length === 0) {
    return;
  }
  if (!email || email.trim().length === 0) {
    return;
  }
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    return;
  }
  if (!password || password.trim().length === 0) {
    return;
  }
  try {
    await editInfo(formData, selectedIndustry, file);
    revalidatePath('/my/profile');
  } catch (error) {
    console.error('수정 중 오류가 발생했습니다.', error);
    throw error;
  }
}

export default editInfoPost;
