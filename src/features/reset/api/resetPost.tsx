'use server';

import { ApiResponse } from '@/shared/model/apiType';
import ky from 'ky';

async function resetPost(
  _prevState: void,
  formData: FormData,
  user: string,
  token: string,
): Promise<ApiResponse<string>> {
  const password = formData?.get('password') as string;
  const confirmPassword = formData?.get('confirmPassword') as string;

  if (
    password.trim().length === 0 ||
    confirmPassword.trim().length === 0 ||
    user.trim().length === 0 ||
    token.trim().length === 0
  ) {
    return {
      status: 400,
      message: '필수값이 없습니다.',
      data: '',
      httpStatus: 400,
    };
  }

  const option = {
    headers: { Authorization: `Bearer ${token}` },
    json: { newPassword: password, confirmPassword },
  };

  console.log('option', option);

  if (user === 'vendor') {
    const res = await ky.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/b2b-service/vendor/resetPassword`,
      option,
    );
    return res.json();
  }

  if (user === 'consumer') {
    const res = await ky.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/b2b-service/consumer/resetPassword`,
      option,
    );
    return res.json();
  }

  return {
    status: 400,
    message: '사용자 타입이 없습니다.',
    data: '',
    httpStatus: 400,
  };
}

export default resetPost;
