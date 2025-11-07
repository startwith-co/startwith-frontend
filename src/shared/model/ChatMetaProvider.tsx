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
  consumerName: string;
  vendorName: string;
  paymentEventSeq: number;
  solutionName: string;
  userImg: string;
  setChatMeta: (
    meta: Partial<Omit<ChatMetaContextType, 'setChatMeta'>>,
  ) => void;
}

const STORAGE_KEY = 'chatMeta';

const ChatMetaContext = createContext<ChatMetaContextType | undefined>(
  undefined,
);
const initialValues = {
  consumerName: '',
  vendorName: '',
  paymentEventSeq: 0,
  solutionName: '',
  userImg: '',
};

function ChatMetaProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ChatMetaContextType>({
    ...initialValues,
    setChatMeta: () => {},
  });

  const setChatMeta = useCallback(
    (meta: Partial<Omit<ChatMetaContextType, 'setChatMeta'>>) => {
      setState((prev) => {
        const updated = { ...prev, ...meta };
        const withSetter = { ...updated, setChatMeta };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(withSetter));
        return withSetter;
      });
    },
    [],
  );

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
  }, [setChatMeta]);

  const value = useMemo(
    () => ({ ...state, setChatMeta }),
    [setChatMeta, state],
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
