interface ChatBubbleProps {
  message: string;
  messageId: string;
  consumerId: string;
  time: string;
  file?: string;
}

export default function ChatUserBubble({
  message,
  messageId,
  consumerId,
  time,
  file,
}: ChatBubbleProps) {
  const isMine = messageId === consumerId;

  return (
    <div
      className={`flex ${isMine ? 'mr-2 flex-row-reverse' : 'ml-2 flex-row'} mt-4 mb-2 gap-1.5`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${isMine ? 'bg-blue-100 text-black' : 'bg-gray-100 text-black'} `}
      >
        {message}
      </div>
      {file && (
        <a href={file} download target="_blank" rel="noopener noreferrer">
          파일 첨부
        </a>
      )}
      <span className="mt-4 text-xs text-gray-400">{time}</span>
    </div>
  );
}
