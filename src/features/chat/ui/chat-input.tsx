'use client';

import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import db from '../../../../fire-config';

/**
 * @description
 * 채팅 메시지를 특정 채팅방에 추가하는 입력 컴포넌트입니다.
 */
function ChatInput({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, 'chats', roomId, 'messages'), {
      text: message,
    });
    setMessage('');
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">전송</button>
    </form>
  );
}

export default ChatInput;
