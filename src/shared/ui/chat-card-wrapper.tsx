import { ReactNode } from 'react';
import formatTime from '../lib/chat-format-time';

interface ChatCardWrapperProps {
  children: ReactNode;
  isMine: boolean;
  msg: any;
}

function ChatCardWrapper({ children, isMine, msg }: ChatCardWrapperProps) {
  const wrapperClass = `flex ${isMine ? 'justify-end' : 'justify-start'} items-end gap-2`;
  const timeEl = (
    <span className="mb-1 self-end text-[11px] text-gray-400">
      {formatTime(msg.createdAt)}
    </span>
  );
  return (
    <div key={msg.id + msg.createdAt} className={wrapperClass}>
      <div
        className={`flex justify-center gap-2 ${isMine ? 'flex-row' : 'flex-row-reverse'}`}
      >
        {timeEl}
        {children}
      </div>
    </div>
  );
}

export default ChatCardWrapper;
