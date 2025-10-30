// hooks/useLastMessage.ts
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
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data() as ChatMessage;

        const modifiedData: ChatMessage = {
          ...data,
          message: data.file
            ? '[첨부파일]'
            : data.message || '[알 수 없는 메시지]',
        };

        setLastMessage(modifiedData);
      } else {
        setLastMessage(null);
      }
    });

    // eslint-disable-next-line consistent-return
    return () => unsubscribe();
  }, [roomId]);

  return lastMessage;
}

export default useLastMessage;
