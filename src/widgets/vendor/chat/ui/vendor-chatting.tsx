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
import { useSearchParams } from 'next/navigation';
import ChattingInput from '@/shared/ui/chatting-input';
import ChatMainDate from '@/shared/ui/chat-main-date';

function VendorChatting() {
  const { vendorName, setChatMeta } = useChatMeta();
  const searchParams = useSearchParams();
  const consumerId = searchParams.get('consumerId') as string;
  const vendorId = searchParams.get('vendorId') as string;

  const {
    handleSubmit,
    attachedFile,
    filePreviewUrl,
    handleFileChange,
    message,
    setMessage,
    messages,
  } = useMessageSend({
    messageId: vendorId,
    messageName: vendorName,
  });

  const { session } = useCurrentSession();

  useEffect(() => {
    if (!consumerId || !vendorId) return;
    const fetchConsumer = async () => {
      const roomInfo = await getRoomInformationById(consumerId, vendorId);

      if (!roomInfo || !session) return;
      const res = await api
        .get(`api/b2b-service/consumer?consumerSeq=${roomInfo.consumerSeq}`)
        .json<ApiResponse<ConsumerDetailType>>();
      setChatMeta({
        vendorName: session.name,
        vendorId: session.uniqueType,
        vendorSeq: session.vendorSeq,
        consumerName: res.data.consumerName,
        consumerId: res.data.consumerUniqueType,
        consumerSeq: res.data.consumerSeq,
      });
    };

    fetchConsumer();
  }, [session, setChatMeta, vendorId, vendorName, consumerId]);

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col rounded-3xl bg-[#FFFFFF] shadow-lg">
      <ChatMainDate messages={messages} />
      <ChatsVendor messages={messages} vendorId={vendorId} />

      <ChattingInput
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
        attachedFile={attachedFile}
        filePreviewUrl={filePreviewUrl}
        consumerId={consumerId}
        vendorId={vendorId}
        handleFileChange={handleFileChange}
        buttonProps="bg-black"
      />
    </div>
  );
}

export default VendorChatting;
