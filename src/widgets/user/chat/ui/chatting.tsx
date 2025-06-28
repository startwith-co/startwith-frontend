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
  const consumerId = searchParams.get('consumerId') as string;
  const vendorId = searchParams.get('vendorId') as string;

  const {
    handleSubmit,
    message,
    setMessage,
    messages,
    attachedFile,
    filePreviewUrl,
    handleFileChange,
  } = useMessageSend({
    messageId: consumerId,
    messageName: consumerName,
  });

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col overflow-hidden rounded-3xl bg-white shadow-md">
      <ChatMainDate messages={messages} />
      <ChatsUser messages={messages} consumerId={consumerId} />
      <ChattingInput
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
        attachedFile={attachedFile}
        filePreviewUrl={filePreviewUrl}
        consumerId={consumerId}
        vendorId={vendorId}
        handleFileChange={handleFileChange}
        buttonProps="bg-[#5B76FF]"
      />
    </div>
  );
}

export default Chatting;
