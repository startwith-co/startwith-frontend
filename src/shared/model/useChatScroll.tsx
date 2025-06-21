import { useEffect, useRef } from 'react';
import { ChatType } from '@/entities/chat/model/type';

interface UseChatScrollProps {
  messages: ChatType[];
}

function useChatScroll({ messages }: UseChatScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return scrollRef;
}

export default useChatScroll;
