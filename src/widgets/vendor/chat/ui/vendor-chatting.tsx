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
  const consumerSeq = searchParams.get('consumerId') as string;
  const vendorSeq = searchParams.get('vendorId') as string;

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
        vendorSeq: String(session.vendorSeq),
        consumerName: res.data.consumerName,
        consumerSeq: String(res.data.consumerSeq),
      });
    };

    fetchConsumer();
  }, [session, setChatMeta, vendorSeq, vendorName, consumerSeq]);

  return (
    <div className="flex min-h-[calc(100vh-200px)] w-full flex-col rounded-3xl bg-[#FFFFFF] shadow-lg">
      <ChatMainDate messages={messages} />
      <ChatsVendor messages={messages} vendorId={vendorSeq} />

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
