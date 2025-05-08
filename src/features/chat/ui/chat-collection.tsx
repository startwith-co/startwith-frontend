'use client';

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../../../../fire-config';

interface Chat {
  id: string;
  text: string;
}

/**
 * @description
 * 특정 채팅방의 채팅 목록을 실시간으로 가져옵니다.
 */
function ChatCollection({ roomId }: { roomId: string }) {
  const [chatData, setChatData] = useState<Chat[]>([]);

  useEffect(() => {
    const messagesRef = collection(db, 'chats', roomId, 'messages');
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { text: string }),
      }));
      setChatData(data);
    });

    return () => unsubscribe();
  }, [roomId]);

  return (
    <div>
      {chatData.map((chat) => (
        <p key={chat.id}>{chat.text}</p>
      ))}
    </div>
  );
}

export default ChatCollection;
