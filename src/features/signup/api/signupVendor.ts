import ky from 'ky';

async function signupVendor(formData: FormData, file: File) {
  const requestPayload = {
    vendorName: formData.get('company'),
    managerName: formData.get('name'),
    phoneNumber: formData.get('phoneNumber'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const body = new FormData();
  body.append(
    'request',
    new Blob([JSON.stringify(requestPayload)], { type: 'application/json' }),
  );
  body.append('businessLicenseImage', file);
  console.log('body', body);
  try {
    const response = await ky.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/b2b-service/vendor`,
      {
        body,
      },
    );
    return response;
  } catch (err) {
    if (err instanceof Error) {
      console.error('서버 응답 에러 본문:', err.message);
    } else {
      console.error('기타 오류:', err);
    }
    throw err;
  }
}

export default signupVendor;
