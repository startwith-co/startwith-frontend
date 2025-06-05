'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface ChatMetaContextType {
  userId: string;
  userName: string;
  vendorId: string;
  vendorName: string;
  setChatMeta: (
    meta: Partial<Omit<ChatMetaContextType, 'setChatMeta'>>,
  ) => void;
}

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
  const [state, setState] = useState(initialValues);

  const setChatMeta = (
    meta: Partial<Omit<ChatMetaContextType, 'setChatMeta'>>,
  ) => {
    setState((prev) => ({ ...prev, ...meta }));
  };

  return (
    <ChatMetaContext.Provider
      value={useMemo(() => ({ ...state, setChatMeta }), [state])}
    >
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
