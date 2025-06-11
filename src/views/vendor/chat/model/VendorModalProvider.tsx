'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

interface VendorRoomIdContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const VendorRoomIdContext = createContext<VendorRoomIdContextType | undefined>(
  undefined,
);

function VendorModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <VendorRoomIdContext.Provider value={value}>
      {children}
    </VendorRoomIdContext.Provider>
  );
}

export const useVendorModal = (): VendorRoomIdContextType => {
  const context = useContext(VendorRoomIdContext);
  if (!context) {
    throw new Error('useVendorModal must be used within a VendorModalProvider');
  }
  return context;
};

export default VendorModalProvider;
