'use client';

import Input from '@/shared/ui/input';
import { MdOutlineAttachFile } from 'react-icons/md';
import { useSearchParams, notFound } from 'next/navigation';
import useMessageSend from '@/shared/model/useMessageSend';

import ChatVendorBubble from '@/entities/chat/ui/chat-vendor-bubble';
import ChatRequestCard from '@/entities/chat/ui/chat-request-card';
import formatTime from '@/shared/lib/chat-format-time';
import { useEffect } from 'react';
import findChatExistingRoom from '@/shared/api/find-chat-existing-room';
import getMessagesById from '@/shared/api/get-messages-by-id';
import { useVendorRoomId } from '@/pages/vendor/chat/model/VendorRoomIdProvider';

function VendorChatting() {
  const searchParams = useSearchParams();
  const userId = searchParams?.get('userId');
  const vendorId = searchParams?.get('vendorId');

  if (!userId || !vendorId) {
    notFound();
  }

  const userName = 'userA';
  const vendorName = 'vendorB';

  const { open, curRoomId, setCurRoomId } = useVendorRoomId();

  const { handleSubmit, message, setMessage, messages, setMessages } =
    useMessageSend({
      messageId: vendorId,
      messageName: vendorName,
      userName,
      vendorName,
      vendorId,
      userId,
      curRoomId,
      setCurRoomId,
    });

  useEffect(() => {
    async function fetchMessages() {
      if (!userId || !vendorId) notFound();
      const roomId = await findChatExistingRoom(userId, vendorId);
      if (!roomId) notFound();
      const fetchedMessages = await getMessagesById(roomId);
      setMessages(fetchedMessages);
    }
    if (open) return;
    fetchMessages();
  }, [userId, vendorId, open]);

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col rounded-3xl border-2 border-[#404040] bg-[#212121]">
      {/* 메시지 영역 */}
      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
        {messages.map((msg) => {
          let parsed;
          try {
            parsed = JSON.parse(msg.message);
          } catch {
            parsed = null;
          }

          if (parsed?.type === 'request-card') {
            return (
              <div key={msg.id} className="flex justify-end gap-2">
                <span className="mt-50 text-xs text-gray-400">
                  {formatTime(msg.createdAt)}
                </span>
                <ChatRequestCard
                  mode="vendor"
                  solutionName={parsed.solutionName}
                  workDate={parsed.workDate}
                  solutionPrice={parsed.solutionPrice}
                />
              </div>
            );
          }

          return (
            <ChatVendorBubble
              key={msg.id}
              message={msg.message}
              messageId={msg.messageId}
              vendorId={vendorId}
              time={formatTime(msg.createdAt)}
            />
          );
        })}
      </div>

      {/* 입력창 영역 */}
      <form onSubmit={handleSubmit} className="relative bg-none p-4">
        <Input
          type="search"
          placeholder="메시지 입력"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-[45px] w-full rounded-3xl pr-20 pl-4 text-white placeholder:font-light"
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
