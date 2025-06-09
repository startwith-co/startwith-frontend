import api from '@/shared/api/index-api';
import { ApiResponse } from '@/shared/model/apiType';
import { toast } from 'react-toastify';

interface RequestServerPost {
  consumerSeq: number;
  vendorSeq: number;
  category: string;
  paymentEventName: string;
  amount: number;
  contractConfirmationUrl: File | null;
  refundPolicyUrl: File | null;
}

interface PaymentEventResponseProps {
  paymentEventSeq: number;
}

export default async function requestServerPost(
  data: RequestServerPost,
): Promise<number> {
  try {
    if (!data.contractConfirmationUrl) {
      toast.error('계약 확인서를 업로드해주세요.');
      return 0;
    }

    if (!data.refundPolicyUrl) {
      toast.error('환불정책을 업로드해주세요.');
      return 0;
    }

    const body = new FormData();

    const requestPayload = {
      consumerSeq: data.consumerSeq,
      vendorSeq: data.vendorSeq,
      category: data.category,
      paymentEventName: data.paymentEventName,
      amount: data.amount,
    };

    body.append(
      'request',
      new File([JSON.stringify(requestPayload)], 'request.json', {
        type: 'application/json',
      }),
    );

    body.append('contractConfirmationUrl', data.contractConfirmationUrl);
    body.append('refundPolicyUrl', data.refundPolicyUrl);

    const res = await api
      .post<ApiResponse<PaymentEventResponseProps>>(
        'api/payment-service/payment-event',
        {
          body,
        },
      )
      .json();

    if (res?.data?.paymentEventSeq != null) {
      console.log('응답 성공:', res);
      return res.data.paymentEventSeq;
    }
    console.warn('서버 응답이 예상과 다릅니다:', res);
    toast.error('결제 요청에 실패했습니다.');
    return 0;
  } catch (error) {
    console.error('요청 중 에러 발생:', error);
    toast.error('결제 요청 중 문제가 발생했습니다.');
    return 0;
  }
}
