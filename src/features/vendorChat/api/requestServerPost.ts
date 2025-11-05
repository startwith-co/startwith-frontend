import api from '@/shared/api/client-api';
import { toast } from 'react-toastify';

interface RequestServerPost {
  consumerSeq: string;
  vendorSeq: string;
  category: string;
  paymentEventName: string;
  amount: number;
  contractConfirmationUrl: File | null;
  refundPolicyUrl: File | null;
  paymentEventUniqueType: string;
}

async function requestServerPost(data: RequestServerPost) {
  const body = new FormData();

  if (!data.contractConfirmationUrl) {
    toast.error('계약 확인서를 업로드해주세요.');
    return;
  }
  if (!data.refundPolicyUrl) {
    toast.error('환불정책을 업로드해주세요.');
    return;
  }

  const requestPayload = {
    consumerSeq: Number(data.consumerSeq),
    vendorSeq: Number(data.vendorSeq),
    category: data.category,
    paymentEventName: data.paymentEventName,
    amount: data.amount,
    paymentEventUniqueType: data.paymentEventUniqueType,
  };

  body.append(
    'request',
    new File([JSON.stringify(requestPayload)], 'request.json', {
      type: 'application/json',
    }),
  );

  body.append('contractConfirmationUrl', data.contractConfirmationUrl);
  body.append('refundPolicyUrl', data.refundPolicyUrl);

  await api.post('api/payment-service/payment-event', {
    body,
  });
}

export default requestServerPost;
