const renderLastMessage = (lastMessage: string) => {
  let parsed;
  try {
    parsed = JSON.parse(lastMessage);
  } catch {
    parsed = null;
  }

  if (parsed && parsed.type === 'request-card') {
    return `${parsed.solutionName} 결제 요청`;
  }
  if (parsed && parsed.type === 'pay-complete-card') {
    return `${parsed.solutionName} 결제 완료`;
  }
  if (parsed && parsed.type === 'cancel-request-card') {
    return `${parsed.solutionName} 결제 취소 요청`;
  }
  if (parsed && parsed.type === 'cancel-complete-card') {
    return `${parsed.solutionName} 결제 취소 완료`;
  }

  return lastMessage;
};

export default renderLastMessage;
