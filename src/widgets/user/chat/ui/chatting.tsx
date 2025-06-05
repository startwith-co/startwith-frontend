'use client';

import ChatBubble from '@/entities/chat/ui/chat-user-bubble';
import ChatRequestCard from '@/entities/chat/ui/chat-user-request-card';
import Input from '@/shared/ui/input';
import formatTime from '@/shared/lib/chat-format-time';
import useMessageSend from '@/shared/model/useMessageSend';
import { MdOutlineAttachFile } from 'react-icons/md';
import { notFound, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useRoomId } from '@/pages/user/chat/model/RoomIdProvider';
import formatMainDate from '@/shared/lib/chat-main-date-format';
import ChatsUser from '@/entities/chat/ui/chats-user';

function Chatting() {
  const searchParams = useSearchParams();
  const userId = searchParams?.get('userId');
  const vendorId = searchParams?.get('vendorId');

  if (!userId || !vendorId) {
    notFound();
  }

  const userName = 'userB';
  const vendorName = 'vendorB';
  const { curRoomId, setCurRoomId } = useRoomId();

  const {
    handleSubmit,
    message,
    setMessage,
    messages,
    attachedFile,
    filePreviewUrl,
    handleFileChange,
  } = useMessageSend({
    messageId: userId,
    messageName: userName,
    userName,
    vendorName,
    vendorId,
    userId,
    curRoomId,
    setCurRoomId,
  });

  const chatMainDate = formatMainDate(messages[0]?.createdAt) || '';

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col overflow-hidden rounded-3xl bg-white shadow-md">
      {chatMainDate && (
        <div className="flex items-center justify-center">
          <span className="mt-3 mb-2 rounded-full bg-[#F5F5F5] px-5 py-2 text-xs text-[#727272]">
            {chatMainDate}
          </span>
        </div>
      )}
      <ChatsUser messages={messages} userId={userId} />

      <form onSubmit={handleSubmit} className="bg-none p-4">
        <div className="relative w-full">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지 입력"
            className="h-[45px] w-full rounded-3xl border border-gray-300 bg-white pr-12 pl-4 placeholder:font-light"
          />
          {attachedFile && (
            <div className="mb-2 px-4">
              {filePreviewUrl ? (
                <Image
                  src={filePreviewUrl}
                  alt="preview"
                  width={100}
                  height={100}
                  className="absolute top-1/2 right-15 -translate-y-1/2 rounded"
                />
              ) : (
                <div className="text-sm text-gray-500">{attachedFile.name}</div>
              )}
            </div>
          )}
          <label htmlFor="file-input">
            <MdOutlineAttachFile className="absolute top-1/2 right-10 size-5.5 -translate-y-1/2 cursor-pointer text-gray-500" />
          </label>
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className="bg-primary absolute top-1/2 right-2 flex size-[30px] -translate-y-1/2 items-center justify-center rounded-full p-1 text-white"
          >
            →
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chatting;
