import { useEffect, useState } from 'react';
import api from '@/shared/api/index-api';

function useSendEmail() {
  const [timer, setTimer] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

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

  const handleSendEmail = async (email: string, target: 'vendor' | 'user') => {
    if (target === 'vendor') {
      await api.post('api/b2b-service/vendor/email/send', {
        json: { email },
      });
    } else {
      await api.post('api/b2b-service/consumer/email/send', {
        json: { email },
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
