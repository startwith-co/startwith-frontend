'use server';

import { redirect } from 'next/navigation';

async function requestPayPost(
  _prevState: void,
  formData: FormData,
): Promise<void> {
  const solutionName = formData?.get('solutionName') as string;
  const solutionPrice = formData?.get('solutionPrice') as string;
  const workDate = formData?.get('workDate') as string;

  if (!solutionName || solutionName.trim().length === 0) {
    return;
  }
  if (!solutionPrice || solutionPrice.trim().length === 0) {
    return;
  }
  if (!workDate || workDate.trim().length === 0) {
    return;
  }

  redirect('/');
}

export default requestPayPost;
