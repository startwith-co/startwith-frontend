import ky from 'ky';

async function signupUser(formData: FormData, industry: string | null) {
  const requestPayload = {
    consumerName: formData.get('company'),
    phoneNum: formData.get('phoneNumber'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    industry,
  };
  console.log(requestPayload);

  try {
    const response = await ky.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/b2b-service/consumer`,
      {
        body: JSON.stringify(requestPayload),
        headers: {
          'Content-Type': 'application/json',
        },
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

export default signupUser;
