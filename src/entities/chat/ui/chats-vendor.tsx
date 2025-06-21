import formatTime from '@/shared/lib/chat-format-time';
import ChatCardWrapper from '@/shared/ui/chat-card-wrapper';
import useChatScroll from '@/shared/model/useChatScroll';
import ChatVendorBubble from './chat-vendor-bubble';
import ChatVendorRequestCard from './chat-vendor-request-card';
import ChatVendorCancelCompleteCard from './chat-vendor-cancelComplete-card';
import ChatVendorPayCompleteCard from './chat-vendor-payComplete-card';
import ChatVendorCancelRequestCard from './chat-vendor-cancel-request-card';
import { ChatType } from '../model/type';

interface ChatsVendorProps {
  messages: ChatType[];
  vendorId: string;
}

function ChatsVendor({ messages, vendorId }: ChatsVendorProps) {
  const scrollRef = useChatScroll({ messages });

  return (
    <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
      {messages.map((msg) => {
        let parsed;
        try {
          parsed = JSON.parse(msg.message);
        } catch {
          parsed = null;
        }

        const isMine = msg.messageId === vendorId;

        if (parsed?.type === 'request-card') {
          return (
            <ChatCardWrapper
              key={msg.id + msg.createdAt}
              isMine={isMine}
              msg={msg}
            >
              <ChatVendorRequestCard {...parsed} />
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
              <ChatVendorPayCompleteCard {...parsed} />
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
              <ChatVendorCancelCompleteCard {...parsed} />
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
              <ChatVendorCancelRequestCard
                {...parsed}
                createdAt={msg.createdAt}
              />
            </ChatCardWrapper>
          );
        }

        return (
          <ChatVendorBubble
            key={msg.id}
            message={msg.message}
            messageId={msg.messageId}
            vendorId={vendorId}
            time={formatTime(msg.createdAt)}
          />
        );
      })}
    </div>
  );
}

export default ChatsVendor;
