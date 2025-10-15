import api from '@/shared/api/client-api';
import { ApiResponse } from '@/shared/model/apiType';
import { useState } from 'react';
import { toast } from 'react-toastify';

function useVerifyEmail(
  email: string,
  code: string,
  target: 'vendor' | 'user',
) {
  const [emailVerified, setEmailVerified] = useState(false);
  async function verifyEmail() {
    try {
      let res;
      if (target === 'vendor') {
        res = await api.post('api/b2b-service/vendor/email/verify', {
          json: { email, code },
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        res = await api.post('api/b2b-service/consumer/email/verify', {
          json: { email, code },
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      const data: ApiResponse<string> = await res.json();
      console.log('verify', data);

      if (data.status === 200) {
        setEmailVerified(true);
        toast.success('이메일 인증에 성공했습니다.');
      } else {
        toast.error('인증에 실패했습니다.');
      }
    } catch (err) {
      toast.error('이메일 인증 중 오류가 발생했습니다.');
    }
  }

  return { emailVerified, verifyEmail };
}

export default useVerifyEmail;
