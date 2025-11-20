'use client';

import useMessageSend from '@/shared/model/useMessageSend';
import ChatsUser from '@/entities/chat/ui/chats-user';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import ChattingInput from '@/shared/ui/chatting-input';
import ChatMainDate from '@/shared/ui/chat-main-date';
import formatMainDate from '@/shared/lib/chat-main-date-format';
import useChatParams from '@/shared/model/useChatParams';

function Chatting() {
  const { consumerName } = useChatMeta();
  const { consumerSeq, vendorSeq } = useChatParams();

  const {
    handleSubmit,
    message,
    setMessage,
    messages,
    attachedFile,
    filePreviewUrl,
    handleFileChange,
    handleFileRemove,
    imageFileRef,
  } = useMessageSend({
    messageId: consumerSeq,
    messageName: consumerName,
    role: 'consumer',
  });

  const chatMainDate =
    formatMainDate(messages[messages.length - 1]?.createdAt) || '';

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col overflow-hidden rounded-3xl bg-white shadow-md">
      <ChatMainDate mainData={chatMainDate} />
      <ChatsUser messages={messages} />
      <ChattingInput
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
        handleFileRemove={handleFileRemove}
        imageFileRef={imageFileRef}
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
