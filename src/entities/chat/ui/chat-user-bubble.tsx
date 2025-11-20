import { ChatFile } from '@/shared/model/chat-type';
import useFileClick from '../model/useFileClick';

interface ChatBubbleProps {
  message: string;
  time: string;
  role: 'consumer' | 'vendor' | 'system';
  file: ChatFile | null;
}

export default function ChatUserBubble({
  message,
  time,
  role,
  file,
}: ChatBubbleProps) {
  const isMine = role === 'consumer';
  const { handleFileClick } = useFileClick(file?.fileUniqueId || '');

  return (
    <div
      className={`flex items-end ${
        isMine ? 'mr-2 flex-row-reverse' : 'ml-2 flex-row'
      } mt-4 mb-2 gap-1.5`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
          isMine ? 'bg-blue-100 text-black' : 'bg-gray-100 text-black'
        }`}
      >
        {file?.fileName ? (
          <button onClick={handleFileClick} className="text-blue-500 underline">
            {file.fileName}
          </button>
        ) : (
          message
        )}
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}
