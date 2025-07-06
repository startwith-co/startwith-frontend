import { auth } from '@/auth';
import serverApi from '@/shared/api/server-api';

async function editInfo(
  formData: FormData,
  industry: string | null,
  file: File | null,
) {
  const form = new FormData();
  const data = await auth();

  if (file) {
    form.append('consumerImageUrl', file);
  }

  const jsonPart = {
    consumerSeq: data?.consumerSeq,
    consumerName: formData.get('company'),
    phoneNumber: formData.get('phoneNumber'),
    email: formData.get('email'),
    encodedPassword: formData.get('password'),
    industry,
  };

  console.log('editInfo', jsonPart);

  form.append(
    'request',
    new Blob([JSON.stringify(jsonPart)], { type: 'application/json' }),
  );

  try {
    const response = await serverApi.put('api/b2b-service/consumer', {
      body: form,
    });
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

export default editInfo;
