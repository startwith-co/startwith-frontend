import formatTime from '@/shared/lib/chat-format-time';
import ChatVendorBubble from './chat-vendor-bubble';
import ChatVendorRequestCard from './chat-vendor-request-card';
import ChatVendorCancelCompleteCard from './chat-vendor-cancelComplete-card';
import ChatVendorPayCompleteCard from './chat-vendor-payComplete-card';
import ChatVendorCancelRequestCard from './chat-vendor-cancel-request-card';

interface ChatsVendorProps {
  messages: any[];
  vendorId: string;
}

function ChatsVendor({ messages, vendorId }: ChatsVendorProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
      {messages.map((msg) => {
        let parsed;
        try {
          parsed = JSON.parse(msg.message);
        } catch {
          parsed = null;
        }

        const isMine = msg.messageId === vendorId;
        const timeEl = (
          <span className="mb-1 self-end text-[11px] text-gray-400">
            {formatTime(msg.createdAt)}
          </span>
        );
        const wrapperClass = `flex ${isMine ? 'justify-end' : 'justify-start'} gap-2`;

        if (parsed?.type === 'request-card') {
          return (
            <div key={msg.id} className={wrapperClass}>
              {isMine ? (
                <>
                  {timeEl}
                  <ChatVendorRequestCard {...parsed} />
                </>
              ) : (
                <>
                  <ChatVendorRequestCard {...parsed} />
                  {timeEl}
                </>
              )}
            </div>
          );
        }

        if (parsed?.type === 'pay-complete-card') {
          return (
            <div key={msg.id} className={wrapperClass}>
              {isMine ? (
                <>
                  {timeEl}
                  <ChatVendorPayCompleteCard {...parsed} />
                </>
              ) : (
                <>
                  <ChatVendorPayCompleteCard {...parsed} />
                  {timeEl}
                </>
              )}
            </div>
          );
        }

        if (parsed?.type === 'cancel-complete-card') {
          return (
            <div key={msg.id} className={wrapperClass}>
              {isMine ? (
                <>
                  {timeEl}
                  <ChatVendorCancelCompleteCard {...parsed} />
                </>
              ) : (
                <>
                  <ChatVendorCancelCompleteCard {...parsed} />
                  {timeEl}
                </>
              )}
            </div>
          );
        }

        if (parsed?.type === 'cancel-request-card') {
          return (
            <div key={msg.id} className={wrapperClass}>
              {isMine ? (
                <>
                  {timeEl}
                  <ChatVendorCancelRequestCard {...parsed} />
                </>
              ) : (
                <>
                  <ChatVendorCancelRequestCard {...parsed} />
                  {timeEl}
                </>
              )}
            </div>
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
