'use client';

import ChatCollection from './chat-collection';
import ChatInput from './chat-input';

export default function ChatTest() {
  const roomId = 'userA_userB'; // 실제 유저 ID로 대체

  return (
    <div>
      <h1>Chat Room</h1>
      <ChatCollection roomId={roomId} />
      <ChatInput roomId={roomId} />
    </div>
  );
}
