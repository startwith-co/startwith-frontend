import { useEffect, useState } from 'react';
import api from '@/shared/api/client-api';
import { ApiResponse } from '@/shared/model/apiType';
import { toast } from 'react-toastify';

function useSendEmail() {
  const [timer, setTimer] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isCounting && timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsCounting(false);
    }
    return () => clearTimeout(countdown);
  }, [isCounting, timer]);

  const handleSendEmail = async (email: string, target: 'vendor' | 'user') => {
    setTimer(300);
    setIsCounting(true);

    const res = await api.get(
      `api/b2b-service/vendor/conflict?email=${email}&type=${target === 'user' ? 'consumer' : 'vendor'}`,
    );
    const data: ApiResponse<boolean> = await res.json();
    if (data.data) {
      toast.error('이미 사용 중인 이메일입니다.');
      setIsCounting(false);
      return;
    }
    const endpoint =
      target === 'vendor'
        ? 'api/b2b-service/vendor/email/send'
        : 'api/b2b-service/consumer/email/send';

    const sendRes: ApiResponse<null> = await api
      .post(endpoint, {
        json: { email },
      })
      .json();

    toast.success('인증 메일을 발송했습니다.');
  };

  return { timer, isCounting, handleSendEmail };
}

export default useSendEmail;
