'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

interface ChatMetaContextType {
  consumerId: string;
  consumerName: string;
  vendorId: string;
  vendorName: string;
  vendorSeq: number;
  consumerSeq: number;
  paymentEventSeq?: number;
  setChatMeta: (
    meta: Partial<Omit<ChatMetaContextType, 'setChatMeta'>>,
  ) => void;
  setPaymentEventSeq: (seq: number) => void;
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
  const [state, setState] = useState<ChatMetaContextType>({
    ...initialValues,
    setChatMeta: () => {},
    setPaymentEventSeq: () => {},
  });

  const setChatMeta = useCallback(
    (meta: Partial<Omit<ChatMetaContextType, 'setChatMeta'>>) => {
      setState((prev) => {
        const updated = { ...prev, ...meta, setChatMeta };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    [],
  );

  const setPaymentEventSeq = useCallback((seq: number) => {
    setState((prev) => {
      const updated = { ...prev, paymentEventSeq: seq };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setState({ ...parsed, setChatMeta });
      } catch {
        console.warn('Invalid chatMeta in sessionStorage');
      }
    }
  }, []);

  const value = useMemo(
    () => ({ ...state, setChatMeta, setPaymentEventSeq }),
    [state, setChatMeta, setPaymentEventSeq],
  );

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
