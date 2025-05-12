'use server';

import sendMessageJson from '@/shared/api/send-message-json';

async function requestPayPost(
  _prevState: void,
  formData: FormData,
  messageId: string,
  messageName: string,
  userId: string,
  vendorId: string,
  userName: string,
  vendorName: string,
): Promise<void> {
  const solutionName = formData?.get('solutionName') as string;
  const solutionPrice = formData?.get('solutionPrice') as string;
  const workDate = formData?.get('workDate') as string;

  if (!solutionName || solutionName.trim().length === 0) {
    return;
  }
  if (!solutionPrice || solutionPrice.trim().length === 0) {
    return;
  }
  if (!workDate || workDate.trim().length === 0) {
    return;
  }
  const messagePayload = {
    type: 'request-card',
    solutionName,
    workDate,
    solutionPrice,
  };

  // 예시: 메시지를 DB나 Firebase에 저장하는 로직
  await sendMessageJson(
    JSON.stringify(messagePayload),
    messageId,
    messageName,
    userId,
    vendorId,
    userName,
    vendorName,
    `/vendor/chat?userId=${userId}&vendorId=${vendorId}`,
  );
}

export default requestPayPost;
