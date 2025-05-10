interface ChatBubbleProps {
  message: string;
  messageId: string;
  userId: string;
  time: string;
}

export default function ChatBubble({
  message,
  messageId,
  userId,
  time,
}: ChatBubbleProps) {
  const isMine = messageId === userId;

  return (
    <div
      className={`flex ${isMine ? 'mr-2 flex-row-reverse' : 'ml-2 flex-row'} mb-2 gap-1.5`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${isMine ? 'bg-blue-100 text-black' : 'bg-gray-100 text-black'} `}
      >
        {message}
      </div>
      <span className="mt-4 text-xs text-gray-400">{time}</span>
    </div>
  );
}
