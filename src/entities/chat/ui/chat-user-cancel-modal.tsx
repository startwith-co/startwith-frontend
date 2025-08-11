import CustomModal from '@/shared/ui/custommodal';
import { Button } from '@/shared/ui/button';
import React, { useCallback } from 'react';
import requestPost from '@/shared/api/request-post';
import { useSolution } from '@/shared/model/SolutionProvider';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { v4 as uuidv4 } from 'uuid';
import api from '@/shared/api/index-api';
import { ApiResponse } from '@/shared/model/apiType';
import { toast } from 'react-toastify';
import { PaymentConflictProps } from '../model/type';
import cancelPayment from '../api/cancelPayment';

interface ChatUserCancelModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChatUserCancelModal({
  open,
  setOpen,
}: ChatUserCancelModalProps) {
  const { solutionName, solutionPrice, solutionCategory } = useSolution();

  const {
    vendorId,
    vendorName,
    consumerId,
    consumerName,
    consumerSeq,
    vendorSeq,
  } = useChatMeta();

  const onCancelPayment = useCallback(async () => {
    cancelPayment(solutionCategory, consumerSeq, vendorSeq);
    await requestPost(
      solutionName,
      solutionPrice.toString(),
      solutionCategory,
      consumerId,
      consumerName,
      consumerId,
      consumerName,
      vendorId,
      vendorName,
      'cancel-request-card',
      uuidv4(),
    );
    setOpen(false);
  }, [solutionName, solutionPrice, solutionCategory, setOpen]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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
        onClick={onCancelPayment}
      >
        네
      </Button>
    </CustomModal>
  );
}
