'use server';

import ky from '@/shared/api/server-api';

async function resetPost(
  _prevState: void,
  formData: FormData,
  user: string,
  token: string,
): Promise<void> {
  const password = formData?.get('password') as string;
  const confirmPassword = formData?.get('confirmPassword') as string;

  if (
    !password ||
    password.trim().length === 0 ||
    confirmPassword ||
    confirmPassword.trim().length === 0 ||
    user ||
    user.trim().length === 0 ||
    token ||
    token.trim().length === 0
  )
    return;

  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    json: {
      newPassword: password,
      confirmPassword,
    },
  };

  if (user === 'vendor') {
    await ky.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/b2b-service/vendor/resetPassword`,
      option,
    );
  } else {
    await ky.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/b2b-service/consumer/resetPassword`,
      option,
    );
  }
}

export default resetPost;
