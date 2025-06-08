'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';

interface ChatMetaContextType {
  consumerId: string;
  consumerName: string;
  vendorId: string;
  vendorName: string;
  vendorSeq: number;
  consumerSeq: number;
  setChatMeta: (
    meta: Partial<Omit<ChatMetaContextType, 'setChatMeta'>>,
  ) => void;
}

const STORAGE_KEY = 'chatMeta';

const ChatMetaContext = createContext<ChatMetaContextType | undefined>(
  undefined,
);

function ChatMetaProvider({
  children,
  initialValues,
}: {
  children: ReactNode;
  initialValues: Omit<ChatMetaContextType, 'setChatMeta'>;
}) {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return initialValues;
        }
      }
    }
    return initialValues;
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setChatMeta = (
    meta: Partial<Omit<ChatMetaContextType, 'setChatMeta'>>,
  ) => {
    setState((prev: any) => ({ ...prev, ...meta }));
  };

  const value = useMemo(() => ({ ...state, setChatMeta }), [state]);

  return (
    <ChatMetaContext.Provider value={value}>
      {children}
    </ChatMetaContext.Provider>
  );
}

export const useChatMeta = (): ChatMetaContextType => {
  const context = useContext(ChatMetaContext);
  if (!context) {
    throw new Error('useChatMeta must be used within a ChatMetaProvider');
  }
  return context;
};

export default ChatMetaProvider;
