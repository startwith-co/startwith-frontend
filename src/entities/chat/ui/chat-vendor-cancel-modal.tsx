import CustomModal from '@/shared/ui/custommodal';
import { Button } from '@/shared/ui/button';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import requestPost from '@/shared/api/request-post';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { v4 as uuidv4 } from 'uuid';
import useChatParams from '@/shared/model/useChatParams';
import refundPayment from '../api/refundPayment';

interface ChatVendorCancelModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  solutionName: string;
  solutionPrice: number;
  solutionCategory: string;
  orderId: string;
  paymentEventSeq: string;
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
  orderId,
  paymentEventSeq,
}: ChatVendorCancelModalProps) {
  const { vendorName, consumerName } = useChatMeta();
  const { vendorSeq, consumerSeq } = useChatParams();

  const onCancelAcceptPayment = useCallback(async () => {
    try {
      // 1️⃣ 환불 처리 API 호출
      await refundPayment({ orderId, paymentEventSeq });

      // 2️⃣ Firestore에 “취소 완료 카드” 메시지 전송
      await requestPost({
        type: 'cancel-complete-card',
        uuid: uuidv4(),
        solutionInfo: {
          name: solutionName,
          price: solutionPrice.toString(),
          category: solutionCategory,
        },
        messageInfo: {
          id: vendorSeq, // 벤더가 메시지 발신자
          name: vendorName,
          consumerName,
          vendorName,
          vendorSeq,
          consumerSeq,
          role: 'vendor',
        },
        orderId,
        paymentEventSeq,
      });

      toast.success('결제가 취소되었습니다.');
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('결제 취소 중 오류가 발생했습니다.');
    }
  }, [
    solutionName,
    solutionPrice,
    solutionCategory,
    vendorSeq,
    vendorName,
    consumerName,
    consumerSeq,
    orderId,
    paymentEventSeq,
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
