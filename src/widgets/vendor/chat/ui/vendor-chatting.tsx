'use client';

import Input from '@/shared/ui/input';
import { MdOutlineAttachFile } from 'react-icons/md';
import useMessageSend from '@/shared/model/useMessageSend';
import { useEffect } from 'react';
import findChatExistingRoom from '@/shared/api/find-chat-existing-room';
import getMessagesById from '@/shared/api/get-messages-by-id';
import { useVendorModal } from '@/views/vendor/chat/model/VendorModalProvider';
import formatMainDate from '@/shared/lib/chat-main-date-format';
import ChatsVendor from '@/entities/chat/ui/chats-vendor';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import useCurrentSession from '@/shared/model/useCurrentSession';
import api from '@/shared/api/index-api';
import { ConsumerDetailType } from '@/shared/model/consumerDetailType';
import { ApiResponse } from '@/shared/model/apiType';

function VendorChatting() {
  const { open } = useVendorModal();
  const { vendorId, vendorName, consumerId, setChatMeta } = useChatMeta();
  const { handleSubmit, message, setMessage, messages, setMessages } =
    useMessageSend({
      messageId: vendorId,
      messageName: vendorName,
    });

  const { session, status } = useCurrentSession();

  useEffect(() => {
    const fetchConsumer = async () => {
      if (!session?.consumerSeq) return;
      const { consumerSeq } = session;

      const res = await api
        .get(`api/b2b-service/consumer?consumerSeq=${consumerSeq}`)
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
  }, [session, setChatMeta, vendorId, vendorName]);

  useEffect(() => {
    async function fetchMessages() {
      if (!consumerId || !vendorId) return;
      const roomId = await findChatExistingRoom(consumerId, vendorId);
      if (!roomId) return;
      const fetchedMessages = await getMessagesById(roomId);
      setMessages(fetchedMessages);
    }
    if (open) return;
    fetchMessages();
  }, [consumerId, vendorId, open, setMessages]);

  const chatMainDate = formatMainDate(messages[0]?.createdAt) || '';

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col rounded-3xl bg-[#FFFFFF] shadow-lg">
      {chatMainDate && (
        <div className="flex items-center justify-center">
          <span className="mt-3 mb-2 rounded-full bg-[#F5F5F5] px-5 py-2 text-xs text-[#727272]">
            {chatMainDate}
          </span>
        </div>
      )}
      <ChatsVendor messages={messages} vendorId={vendorId} />

      {/* 입력창 영역 */}
      <form onSubmit={handleSubmit} className="relative bg-none p-4">
        <Input
          type="search"
          placeholder="메시지 입력"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-[45px] w-full rounded-3xl pr-20 pl-4 text-black placeholder:font-light"
        />
        <MdOutlineAttachFile className="absolute top-1/2 right-16 size-5.5 -translate-y-1/2 transform text-white" />
        <button
          type="submit"
          className="absolute top-1/2 right-7 flex size-[30px] -translate-y-1/2 transform items-center justify-center rounded-full bg-[#212121] p-1 text-center text-white"
        >
          →
        </button>
      </form>
    </div>
  );
}

export default VendorChatting;
