import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  limit,
  query,
  Timestamp,
} from 'firebase/firestore';
import db from 'fire-config';

export interface ChatMessage {
  createdAt: Timestamp;
  file: boolean;
  message: string;
  messageId: string;
  messageName: string;
}

function useLastMessage(roomId: string) {
  const [lastMessage, setLastMessage] = useState<ChatMessage | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const messagesCollection = collection(db, 'chats', roomId, 'messages');
    const q = query(messagesCollection, orderBy('createdAt', 'desc'), limit(1));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setLastMessage(null);
        return;
      }

      const doc = snapshot.docs[0];
      const data = doc.data() as ChatMessage;

      let parsedType: string | null = null;
      try {
        const parsed = JSON.parse(data.message);
        parsedType = parsed?.type || null;
      } catch {
        parsedType = null;
      }

      let messagePreview = '';
      switch (parsedType) {
        case 'request-card':
          messagePreview = '[결제 요청]';
          break;
        case 'cancel-request-card':
          messagePreview = '[결제 취소 요청]';
          break;
        case 'pay-complete-card':
          messagePreview = '[결제 완료]';
          break;
        case 'cancel-complete-card':
          messagePreview = '[결제 취소 완료]';
          break;
        default:
          // 3️⃣ 일반 메시지 or 파일
          if (data.file) messagePreview = '[첨부파일]';
          else messagePreview = data.message || '[알 수 없는 메시지]';
      }

      // 4️⃣ 수정된 message 값만 적용
      const modifiedData: ChatMessage = {
        ...data,
        message: messagePreview,
      };

      setLastMessage(modifiedData);
    });

    // eslint-disable-next-line consistent-return
    return () => unsubscribe();
  }, [roomId]);

  return lastMessage;
}

export default useLastMessage;
