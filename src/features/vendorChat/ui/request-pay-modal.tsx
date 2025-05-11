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
      <DialogContent className="flex h-auto w-[500px] flex-col items-center justify-center rounded-2xl border-0 bg-[#212121] px-7 py-8">
        <DialogHeader>
          <DialogTitle className="mt-10 text-center text-xl font-bold text-white">
            결제 요청하기
          </DialogTitle>
        </DialogHeader>

        <RequestPayForm />
      </DialogContent>
    </Dialog>
  );
}
