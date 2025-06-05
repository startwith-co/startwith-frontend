'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

import { useVendorRoomId } from '@/pages/vendor/chat/model/VendorRoomIdProvider';
import RequestPayForm from './request-pay-form';

export default function RequestPayModal() {
  const { open, setOpen } = useVendorRoomId();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-min-[620px] flex w-[500px] flex-col items-center justify-center overflow-y-auto rounded-2xl border-0 bg-[#ffffff] px-7 py-8">
        <DialogHeader>
          <DialogTitle className="mt-10 text-center text-xl font-bold text-black">
            결제 요청하기
          </DialogTitle>
        </DialogHeader>

        <RequestPayForm />
      </DialogContent>
    </Dialog>
  );
}
