import { ChatType } from '@/entities/chat/model/type';
import formatMainDate from '@/shared/lib/chat-main-date-format';

function ChatMainDate({ messages }: { messages: ChatType[] }) {
  const chatMainDate = formatMainDate(messages[0]?.createdAt) || '';

  return (
    <div className="flex items-center justify-center">
      <span className="mt-3 mb-2 rounded-full bg-[#F5F5F5] px-5 py-2 text-xs text-[#727272]">
        {chatMainDate}
      </span>
    </div>
  );
}

export default ChatMainDate;
