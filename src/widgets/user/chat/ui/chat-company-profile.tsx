import ChatUserCard from '@/entities/chat/ui/chat-user-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

function ChatCompanyProfile() {
  return (
    <div className="flex h-full w-full flex-col gap-2.5 rounded-3xl bg-white px-8 pt-[19px] shadow-md">
      <Avatar className="flex size-20 items-center justify-center self-center rounded-full">
        <AvatarImage src="https://github.com/shadcn.png" />
        {/* 이미지 로드 실패 시 fallback */}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2.5">
        <p className="text-center text-lg font-semibold">더비즈온</p>
        <ChatUserCard title="제목" content="내용" />
        <ChatUserCard title="제목" content="내용" />
        <ChatUserCard title="제목" content="내용" />
      </div>
    </div>
  );
}

export default ChatCompanyProfile;
