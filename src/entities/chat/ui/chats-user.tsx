import formatTime from '@/shared/lib/chat-format-time';
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
        const timeEl = (
          <span className="mb-1 self-end text-[11px] text-gray-400">
            {formatTime(msg.createdAt)}
          </span>
        );
        const wrapperClass = `flex ${isMine ? 'justify-end' : 'justify-start'} items-end gap-2`;

        if (parsed?.type === 'request-card') {
          return (
            <div key={msg.id + msg.createdAt} className={wrapperClass}>
              {isMine ? (
                <>
                  {timeEl}
                  <ChatUserRequestCard {...parsed} />
                </>
              ) : (
                <>
                  <ChatUserRequestCard {...parsed} />
                  {timeEl}
                </>
              )}
            </div>
          );
        }

        if (parsed?.type === 'pay-complete-card') {
          return (
            <div key={msg.id + msg.createdAt} className={wrapperClass}>
              {isMine ? (
                <>
                  {timeEl}
                  <ChatUserPayCompleteCard {...parsed} />
                </>
              ) : (
                <>
                  <ChatUserPayCompleteCard {...parsed} />
                  {timeEl}
                </>
              )}
            </div>
          );
        }

        if (parsed?.type === 'cancel-request-card') {
          return (
            <div key={msg.id + msg.createdAt} className={wrapperClass}>
              {isMine ? (
                <>
                  {timeEl}
                  <ChatUserCancelRequestCard {...parsed} />
                </>
              ) : (
                <>
                  <ChatUserCancelRequestCard {...parsed} />
                  {timeEl}
                </>
              )}
            </div>
          );
        }

        if (parsed?.type === 'cancel-complete-card') {
          return (
            <div key={msg.id + msg.createdAt} className={wrapperClass}>
              {isMine ? (
                <>
                  {timeEl}
                  <ChatUserCancelCompleteCard {...parsed} />
                </>
              ) : (
                <>
                  <ChatUserCancelCompleteCard {...parsed} />
                  {timeEl}
                </>
              )}
            </div>
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
