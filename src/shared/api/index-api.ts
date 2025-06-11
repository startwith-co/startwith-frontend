import ky, { HTTPError } from 'ky';
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';
import { getErrorDataFromKyError } from '../lib/error-handler';

const session = await getSession();
const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (!req.headers.get('Authorization')) {
          req.headers.set('Authorization', `Bearer ${session?.accessToken}`);
        }
      },
    ],

    beforeError: [
      async (error) => {
        if (error instanceof HTTPError) {
          // const { response } = error;

          // // ❗ accessToken 만료라고 백엔드에서 알려주는 코드인지 확인
          // if (response.status === 401) {
          //   // 👉 토큰 재발급 로직 수행
          //   // 예: /auth/refresh API 호출

          //   try {
          //     const refreshed = await fetch('/api/auth/refresh'); // or ky
          //     const newSession = await refreshed.json();

          //     // ❗ 여기서 accessToken 저장 (쿠키, 세션, 상태 등)

          //     // 👉 원래 요청 재시도 가능
          //     return ky(error.request); // or return api(error.request)
          //   } catch (refreshError) {
          //     toast.error('세션이 만료되었습니다. 다시 로그인 해주세요.');
          //   }
          // }

          // 일반적인 오류 처리

          const errorData = await getErrorDataFromKyError(error);
          toast.error(`[${errorData.code}] ${errorData.message}`);
        } else {
          toast.error('알 수 없는 에러가 발생했습니다.');
        }

        return error;
      },
    ],
  },
});

export default api;
