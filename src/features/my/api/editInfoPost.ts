'use server';

import { revalidatePath } from 'next/cache';
import editInfo from './editInfo';

async function editInfoPost(
  _prevState: void,
  formData: FormData,
  file: File | null,
  selectedIndustry: string | null,
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

  await editInfo(formData, selectedIndustry, file);
  revalidatePath('/my/profile');
}

export default editInfoPost;
