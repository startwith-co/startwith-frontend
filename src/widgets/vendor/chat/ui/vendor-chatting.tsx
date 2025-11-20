'use client';

import useMessageSend from '@/shared/model/useMessageSend';
import { useEffect } from 'react';
import ChatsVendor from '@/entities/chat/ui/chats-vendor';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import useCurrentSession from '@/shared/model/useCurrentSession';
import api from '@/shared/api/client-api';
import { ConsumerDetailType } from '@/shared/model/consumerDetailType';
import { ApiResponse } from '@/shared/model/apiType';
import getRoomInformationById from '@/shared/api/get-room-information-by-id';
import ChattingInput from '@/shared/ui/chatting-input';
import ChatMainDate from '@/shared/ui/chat-main-date';
import formatMainDate from '@/shared/lib/chat-main-date-format';
import useChatParams from '@/shared/model/useChatParams';

function VendorChatting() {
  const { vendorName, setChatMeta } = useChatMeta();
  const { vendorSeq, consumerSeq } = useChatParams();

  const {
    handleSubmit,
    attachedFile,
    filePreviewUrl,
    handleFileChange,
    message,
    setMessage,
    messages,
  } = useMessageSend({
    messageId: vendorSeq,
    messageName: vendorName,
    role: 'vendor',
  });

  const { session } = useCurrentSession();

  useEffect(() => {
    if (!consumerSeq || !vendorSeq) return;
    const fetchConsumer = async () => {
      const roomInfo = await getRoomInformationById(consumerSeq, vendorSeq);

      if (!roomInfo || !session) return;
      const res = await api
        .get(`api/b2b-service/consumer?consumerSeq=${roomInfo.consumerSeq}`)
        .json<ApiResponse<ConsumerDetailType>>();
      setChatMeta({
        vendorName: session.name,
        consumerName: res.data.consumerName,
      });
    };

    fetchConsumer();
  }, [session, setChatMeta, vendorSeq, vendorName, consumerSeq]);

  const chatMainDate =
    formatMainDate(messages[messages.length - 1]?.createdAt) || '';

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col overflow-hidden rounded-3xl bg-[#FFFFFF] shadow-lg">
      <ChatMainDate mainData={chatMainDate} />
      <ChatsVendor messages={messages} />
      <ChattingInput
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
        attachedFile={attachedFile}
        filePreviewUrl={filePreviewUrl}
        consumerSeq={consumerSeq}
        vendorSeq={vendorSeq}
        handleFileChange={handleFileChange}
        buttonProps="bg-black"
      />
    </div>
  );
}

export default VendorChatting;
