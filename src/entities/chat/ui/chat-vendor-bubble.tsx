interface ChatBubbleProps {
  message: string;
  messageId: string;
  vendorId: string;
  time: string;
}

export default function ChatVendorBubble({
  message,
  messageId,
  vendorId,
  time,
}: ChatBubbleProps) {
  const isMine = messageId === vendorId;

  return (
    <div
      className={`flex ${isMine ? 'mr-2 flex-row-reverse' : 'ml-2 flex-row'} mt-4 mb-2 gap-1.5`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${isMine ? 'bg-[#DBE8FF]' : 'bg-[#F1F1F1]'} `}
      >
        {message}
      </div>
      <span className="mt-4 text-xs text-gray-400">{time}</span>
    </div>
  );
}
