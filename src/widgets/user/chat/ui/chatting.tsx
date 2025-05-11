'use client';

import ChatBubble from '@/entities/chat/ui/chat-bubble';
import ChatRequestCard from '@/entities/chat/ui/chat-request-card';
import Input from '@/shared/ui/input';
import formatTime from '@/shared/lib/chat-format-time';
import useMessageSend from '@/shared/model/useMessageSend';
import { MdOutlineAttachFile } from 'react-icons/md';
import { notFound, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useRoomId } from '@/pages/user/chat/model/RoomIdProvider';

function Chatting() {
  const searchParams = useSearchParams();
  const userId = searchParams?.get('userId');
  const vendorId = searchParams?.get('vendorId');

  if (!userId || !vendorId) {
    notFound();
  }

  const userName = 'userA';
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

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col overflow-hidden rounded-3xl bg-white shadow-md">
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((msg) => {
          let parsed;
          try {
            parsed = JSON.parse(msg.message);
          } catch {
            parsed = null;
          }

          if (parsed?.type === 'request-card') {
            return (
              <div className="flex gap-2" key={msg.id}>
                <ChatRequestCard
                  mode="user"
                  solutionName={parsed.solutionName}
                  workDate={parsed.workDate}
                  solutionPrice={parsed.solutionPrice}
                />
                <span className="mt-50 text-xs text-gray-400">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            );
          }

          return (
            <>
              <ChatBubble
                key={msg.id}
                message={msg.message}
                messageId={msg.messageId}
                userId={userId}
                time={formatTime(msg.createdAt)}
              />
              {/* TODO: 파일 첨부 기능 구현 */}
              {/* {messages.map((msg) => {
                const isImage = msg.file?.type?.startsWith('image/');
                return (
                  <div key={msg.id}>
                    <ChatBubble
                      message={msg.message}
                      messageId={msg.messageId}
                      userId={userId}
                      time={formatTime(msg.createdAt)}
                    />
                    {msg.file && (
                      <div className="mt-2 ml-4">
                        {isImage ? (
                          <Image
                            src={msg.file.url}
                            alt={msg.file.name}
                            width={200}
                            height={200}
                            className="rounded"
                          />
                        ) : (
                          <a
                            href={msg.file.url}
                            download={msg.file.name}
                            className="text-blue-500 underline"
                          >
                            📎 {msg.file.name}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );
              })} */}
            </>
          );
        })}
      </div>

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
