import api from '@/shared/api/client-api';
import deleteLastMessage from './delete-last-message';

export default async function ChatFilePost(
  consumerSeq: number,
  vendorSeq: number,
  chatUniqueType: string,
  sendWho: string,
  file: File,
) {
  const body = new FormData();
  const payload = {
    senderSeq: sendWho === 'consumer' ? consumerSeq : vendorSeq,
    receiverSeq: sendWho === 'consumer' ? vendorSeq : consumerSeq,
    chatUniqueType,
  };
  console.log('payload', payload);
  body.append(
    'request',
    new File([JSON.stringify(payload)], 'request.json', {
      type: 'application/json',
    }),
  );
  body.append('file', file);
  try {
    const res = await api.post(`api/b2b-service/chat`, { body });

    if (!res.ok) {
      deleteLastMessage(chatUniqueType);
    }

    const response = await res.json();
    return response;
  } catch (err) {
    console.error('API 호출 중 오류 발생:', err);
    throw err;
  }
}
