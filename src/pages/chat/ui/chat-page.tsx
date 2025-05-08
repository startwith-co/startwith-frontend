import ChatRooms from '@/widgets/chat/ui/chat-rooms';
import ChatTest from '@/features/chat/ui/chat-test';
import ChatCompanyProfile from '@/widgets/chat/ui/chat-company-profile';
import Chatting from '@/widgets/chat/ui/chatting';

export default function ChatPage() {
  return (
    <div className="mt-[90px] grid grid-cols-[2fr_4fr_1.5fr] gap-6">
      <ChatRooms />
      <Chatting />
      <ChatCompanyProfile />
      <ChatTest />
    </div>
  );
}
