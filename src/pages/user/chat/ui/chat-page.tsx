import ChatRooms from '@/widgets/user/chat/ui/chat-rooms';
import ChatCompanyProfile from '@/widgets/user/chat/ui/chat-company-profile';
import Chatting from '@/widgets/user/chat/ui/chatting';
import RoomIdProvider from '@/shared/model/RoomIdProvider';
import ChattingMainWrapper from '@/shared/ui/chatting-main-wrapper';
import SolutionProvider from '@/shared/model/SolutionProvider';

export default async function ChatPage() {
  return (
    <ChattingMainWrapper>
      <SolutionProvider>
        <RoomIdProvider>
          <div className="mt-[90px] grid grid-cols-[2fr_4fr_1.5fr] gap-6">
            <ChatRooms />
            <Chatting />
            <ChatCompanyProfile />
          </div>
        </RoomIdProvider>
      </SolutionProvider>
    </ChattingMainWrapper>
  );
}
