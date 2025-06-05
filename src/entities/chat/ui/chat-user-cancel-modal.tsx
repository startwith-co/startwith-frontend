import CustomModal from '@/shared/ui/custommodal';
import { Button } from '@/shared/ui/button';
import React from 'react';

interface ChatUserCancelModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChatUserCancelModal({
  open,
  setOpen,
}: ChatUserCancelModalProps) {
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="결제를 취소하시겠습니까?"
      contentProps="flex h-auto w-[450px] flex-col justify-start rounded-2xl border-0 bg-white px-8 pb-8 pt-4"
      titleProps="mt-2 text-center text-xl font-bold text-black"
    >
      <Button
        variant="textBlue"
        className="h-[44px] w-full bg-[#F1F1F1] font-bold text-black"
        asChild={false}
      >
        네
      </Button>
    </CustomModal>
  );
}
