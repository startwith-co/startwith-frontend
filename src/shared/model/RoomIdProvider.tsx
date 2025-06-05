'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

interface RoomIdContextType {
  curRoomId: string | null;
  setCurRoomId: (curRoomId: string) => void;
}

const RoomIdContext = createContext<RoomIdContextType | undefined>(undefined);

function RoomIdProvider({ children }: { children: ReactNode }) {
  const [curRoomId, setCurRoomId] = useState<string | null>(null);

  const value = useMemo(() => ({ curRoomId, setCurRoomId }), [curRoomId]);

  return (
    <RoomIdContext.Provider value={value}>{children}</RoomIdContext.Provider>
  );
}

export const useRoomId = (): RoomIdContextType => {
  const context = useContext(RoomIdContext);
  if (!context) {
    throw new Error('useRoomId must be used within a RoomIdProvider');
  }
  return context;
};

export default RoomIdProvider;
