import CustomModal from '@/shared/ui/custommodal';
import { Button } from '@/shared/ui/button';
import React, { useCallback } from 'react';
import requestPost from '@/shared/api/request-post';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { v4 as uuidv4 } from 'uuid';

interface ChatVendorCancelModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  solutionName: string;
  solutionPrice: number;
  solutionCategory: string;
}

const formatPrice = (num: string) => {
  return `${Number(num).toLocaleString('ko-KR')}(VAT 포함)`;
};

export default function ChatVendorCancelModal({
  open,
  setOpen,
  solutionName,
  solutionPrice,
  solutionCategory,
}: ChatVendorCancelModalProps) {
  const { vendorId, vendorName, consumerId, consumerName } = useChatMeta();

  const onCancelAcceptPayment = useCallback(async () => {
    await requestPost(
      solutionName,
      solutionPrice.toString(),
      solutionCategory,
      vendorId,
      vendorName,
      consumerId,
      consumerName,
      vendorId,
      vendorName,
      'cancel-complete-card',
      uuidv4(),
    );
    setOpen(false);
  }, [
    solutionName,
    solutionPrice,
    solutionCategory,
    vendorId,
    vendorName,
    consumerId,
    consumerName,
    setOpen,
  ]);

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
      <div className="space-y-4 text-sm text-black">
        <div className="flex justify-between">
          <span className="font-semibold">결제 금액</span>
          <span className="font-semibold">
            {formatPrice(solutionPrice.toString())}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <span className="font-semibold">환불 금액</span>
            <span className="font-semibold text-red-500">*</span>
          </div>
          <span className="rounded-md bg-[#F1F1F1] px-4 py-2 text-sm font-medium">
            {formatPrice(solutionPrice.toString())}
          </span>
        </div>
        <p className="text-xs leading-5 text-gray-600">
          본 결제 취소 및 환불 요청은 계약 당사자 간 협의에 따라 개별 처리되며,
          <b className="font-semibold text-black">
            {' '}
            SOLU는 이와 관련한 책임 또는 개입 의무를 지지 않습니다.
          </b>
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 justify-between gap-2">
        <Button
          variant="bgBlueGradient"
          className="h-[44px] w-full font-bold text-white"
          asChild={false}
          onClick={onCancelAcceptPayment}
        >
          네
        </Button>
        <Button
          asChild={false}
          variant="secondary"
          className="h-[44px] w-full bg-[#F1F1F1] font-bold"
          onClick={handleCancel}
        >
          아니요
        </Button>
      </div>
    </CustomModal>
  );
}
