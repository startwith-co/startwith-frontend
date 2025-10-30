import useFileClick from '../model/useFileClick';

interface ChatBubbleProps {
  message: string;
  messageId: string;
  vendorId: string;
  time: string;
  file: string;
}

export default function ChatVendorBubble({
  message,
  messageId,
  vendorId,
  time,
  file,
}: ChatBubbleProps) {
  const isMine = messageId === vendorId;
  const { handleFileClick } = useFileClick(file);
  return (
    <div
      className={`flex ${isMine ? 'mr-2 flex-row-reverse' : 'ml-2 flex-row'} mt-4 mb-2 gap-1.5`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${isMine ? 'bg-[#DBE8FF]' : 'bg-[#F1F1F1]'} `}
      >
        {file ? (
          <button onClick={handleFileClick} className="text-blue-500 underline">
            파일 첨부
          </button>
        ) : (
          message
        )}
      </div>
      <span className="mt-4 text-xs text-gray-400">{time}</span>
    </div>
  );
}
