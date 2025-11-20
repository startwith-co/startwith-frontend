'use client';

import formatTime from '@/shared/lib/chat-format-time';
import ChatCardWrapper from '@/shared/ui/chat-card-wrapper';
import useChatScroll from '@/shared/model/useChatScroll';
import ChatUserBubble from './chat-user-bubble';
import ChatUserCancelRequestCard from './chat-user-cancel-request-card';
import ChatUserPayCompleteCard from './chat-user-payComplete-card';
import ChatUserCancelCompleteCard from './chat-user-cancelComplete-card';
import ChatUserRequestCard from './chat-user-request-card';
import { ChatType } from '../model/type';

interface ChatsUserProps {
  messages: ChatType[];
}

function ChatsUser({ messages }: ChatsUserProps) {
  const scrollRef = useChatScroll({ messages });

  return (
    <div
      ref={scrollRef}
      className="flex-1 space-y-4 overflow-x-hidden overflow-y-auto px-4 py-4"
    >
      {messages.map((msg) => {
        let parsed;
        try {
          parsed = JSON.parse(msg.message);
        } catch {
          parsed = null;
        }

        const isMine = msg.role === 'consumer';

        if (parsed?.type === 'request-card') {
          return (
            <ChatCardWrapper
              key={msg.id + msg.createdAt}
              isMine={isMine}
              msg={msg}
            >
              <ChatUserRequestCard {...parsed} isMine={isMine} />
            </ChatCardWrapper>
          );
        }

        if (parsed?.type === 'pay-complete-card') {
          return (
            <ChatCardWrapper
              key={msg.id + msg.createdAt}
              isMine={isMine}
              msg={msg}
            >
              <ChatUserPayCompleteCard
                {...parsed}
                isMine={isMine}
                createdAt={msg.createdAt}
              />
            </ChatCardWrapper>
          );
        }

        if (parsed?.type === 'cancel-request-card') {
          return (
            <ChatCardWrapper
              key={msg.id + msg.createdAt}
              isMine={isMine}
              msg={msg}
            >
              <ChatUserCancelRequestCard {...parsed} isMine={isMine} />
            </ChatCardWrapper>
          );
        }

        if (parsed?.type === 'cancel-complete-card') {
          return (
            <ChatCardWrapper
              key={msg.id + msg.createdAt}
              isMine={isMine}
              msg={msg}
            >
              <ChatUserCancelCompleteCard {...parsed} isMine={isMine} />
            </ChatCardWrapper>
          );
        }

        return (
          <ChatUserBubble
            key={msg.id + msg.createdAt}
            message={msg.message}
            time={formatTime(msg.createdAt)}
            role={msg.role}
            file={msg.file}
          />
        );
      })}
    </div>
  );
}

export default ChatsUser;
