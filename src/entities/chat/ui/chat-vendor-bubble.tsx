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
      className={`flex ${isMine ? 'mr-2 flex-row-reverse' : 'ml-2 flex-row'} mb-2 gap-1.5`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm text-white ${isMine ? 'bg-[#000000]' : 'bg-[#3D3D3D]'} `}
      >
        {message}
      </div>
      <span className="mt-4 text-xs text-gray-400">{time}</span>
    </div>
  );
}
