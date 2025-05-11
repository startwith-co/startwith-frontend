'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

interface VendorRoomIdContextType {
  curRoomId: string | null;
  setCurRoomId: (curRoomId: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const VendorRoomIdContext = createContext<VendorRoomIdContextType | undefined>(
  undefined,
);

function VendorRoomIdProvider({ children }: { children: ReactNode }) {
  const [curRoomId, setCurRoomId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({ curRoomId, setCurRoomId, open, setOpen }),
    [curRoomId, open],
  );

  return (
    <VendorRoomIdContext.Provider value={value}>
      {children}
    </VendorRoomIdContext.Provider>
  );
}

export const useVendorRoomId = (): VendorRoomIdContextType => {
  const context = useContext(VendorRoomIdContext);
  if (!context) {
    throw new Error(
      'useVendorRoomId must be used within a VendorRoomIdProvider',
    );
  }
  return context;
};

export default VendorRoomIdProvider;
