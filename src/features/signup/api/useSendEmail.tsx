import { useEffect, useState } from 'react';

// 내부 state 추가

function useSendEmail() {
  const [timer, setTimer] = useState(0); // 남은 시간 (초 단위)
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
  const handleSendEmail = () => {
    // TODO: 이메일 전송 API 요청 (원한다면 추가)
    setTimer(180); // 3분 설정
    setIsCounting(true); // 타이머 시작
  };

  return {
    timer,
    isCounting,
    handleSendEmail,
  };
}

export default useSendEmail;
