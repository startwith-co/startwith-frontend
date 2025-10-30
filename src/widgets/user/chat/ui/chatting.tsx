'use client';

import useMessageSend from '@/shared/model/useMessageSend';
import ChatsUser from '@/entities/chat/ui/chats-user';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { useSearchParams } from 'next/navigation';
import ChattingInput from '@/shared/ui/chatting-input';
import ChatMainDate from '@/shared/ui/chat-main-date';

function Chatting() {
  const { consumerName } = useChatMeta();
  const searchParams = useSearchParams();
  const consumerSeq = searchParams.get('consumerId') as string;
  const vendorSeq = searchParams.get('vendorId') as string;

  const {
    handleSubmit,
    message,
    setMessage,
    messages,
    attachedFile,
    filePreviewUrl,
    handleFileChange,
  } = useMessageSend({
    messageId: consumerSeq,
    messageName: consumerName,
  });

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col overflow-hidden rounded-3xl bg-white shadow-md">
      <ChatMainDate messages={messages} />
      <ChatsUser messages={messages} consumerId={consumerSeq} />
      <ChattingInput
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
        attachedFile={attachedFile}
        filePreviewUrl={filePreviewUrl}
        consumerSeq={consumerSeq}
        vendorSeq={vendorSeq}
        handleFileChange={handleFileChange}
        buttonProps="bg-[#5B76FF]"
      />
    </div>
  );
}

export default Chatting;
