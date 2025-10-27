'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import RequestPayModal from '@/features/vendorChat/ui/request-pay-modal';
import { useVendorModal } from '@/views/vendor/chat/model/VendorModalProvider';
import ChatUserCard from '@/entities/chat/ui/chat-user-card';
import { useSearchParams } from 'next/navigation';
import { solutionCategoryToLabel } from '@/shared/model/getCategoryList';
import useFetchConsumer from '../model/useFetchConsumer';

function VendorControl() {
  const { setOpen } = useVendorModal();
  const searchParams = useSearchParams();
  const consumerId = searchParams.get('consumerId') as string;
  const vendorId = searchParams.get('vendorId') as string;
  const { consumerInfo } = useFetchConsumer();

  return (
    <div className="flex h-full w-full flex-col gap-2.5 rounded-3xl bg-[#FFFFFF] px-8 pt-[19px] shadow-lg">
      <Avatar className="flex size-20 items-center justify-center self-center rounded-full">
        <AvatarImage
          src={consumerInfo?.consumerImageUrl || '/images/default-profile.svg'}
        />
        <AvatarFallback>{consumerInfo?.consumerName}</AvatarFallback>
      </Avatar>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-2.5">
          <p className="text-center text-lg font-semibold">
            {consumerInfo?.consumerName}
          </p>
          <ChatUserCard
            title="종사 산업군"
            content={
              solutionCategoryToLabel[consumerInfo?.industry ?? ''] ??
              consumerInfo?.industry ??
              ''
            }
          />
        </div>
        <div className="mb-5 flex flex-col gap-2.5">
          <Button
            asChild={false}
            disabled={!consumerId || !vendorId}
            variant="bgBlueGradient"
            className="h-[50px] w-[90%] self-center text-sm text-white"
            onClick={() => {
              setOpen(true);
            }}
          >
            결제 요청하기
          </Button>
          <RequestPayModal />
        </div>
      </div>
    </div>
  );
}

export default VendorControl;
