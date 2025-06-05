import formatTime from '@/shared/lib/chat-format-time';
import ChatCardWrapper from '@/shared/ui/chat-card-wrapper';
import ChatUserBubble from './chat-user-bubble';
import ChatUserCancelRequestCard from './chat-user-cancel-request-card';
import ChatUserPayCompleteCard from './chat-user-payComplete-card';
import ChatUserCancelCompleteCard from './chat-user-cancelComplete-card';
import ChatUserRequestCard from './chat-user-request-card';

interface ChatsUserProps {
  messages: any[];
  userId: string;
}

function ChatsUser({ messages, userId }: ChatsUserProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
      {messages.map((msg) => {
        let parsed;
        try {
          parsed = JSON.parse(msg.message);
        } catch {
          parsed = null;
        }

        const isMine = msg.messageId === userId;

        if (parsed?.type === 'request-card') {
          return (
            <ChatCardWrapper
              key={msg.id + msg.createdAt}
              isMine={isMine}
              msg={msg}
            >
              <ChatUserRequestCard {...parsed} />
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
              <ChatUserPayCompleteCard {...parsed} />
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
              <ChatUserCancelRequestCard {...parsed} />
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
              <ChatUserCancelCompleteCard {...parsed} />
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
              <ChatUserCancelRequestCard {...parsed} />
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
              <ChatUserCancelCompleteCard {...parsed} />
            </ChatCardWrapper>
          );
        }

        return (
          <ChatUserBubble
            key={msg.id + msg.createdAt}
            message={msg.message}
            messageId={msg.messageId}
            userId={userId}
            time={formatTime(msg.createdAt)}
          />
        );
      })}
    </div>
  );
}

export default ChatsUser;
