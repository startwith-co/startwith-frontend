import { useEffect, useState } from 'react';
import api from '@/shared/api/index-api';

function useSendEmail() {
  const [timer, setTimer] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  // 타이머 감소 로직
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isCounting && timer > 0) {
      countdown = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCounting(false);
    }
    return () => clearTimeout(countdown);
  }, [isCounting, timer]);

  // 버튼 클릭 핸들러
  const handleSendEmail = (email: string, target: 'vendor' | 'user') => {
    if (target === 'vendor') {
      api.post('api/b2b-service/vendor/email/send', {
        body: JSON.stringify({ email }),
      });
    } else {
      api.post('api/b2b-service/consumer/email/send', {
        body: JSON.stringify({ email }),
      });
    }
    setTimer(300);
    setIsCounting(true);
  };

  return {
    timer,
    isCounting,
    handleSendEmail,
  };
}

export default useSendEmail;
