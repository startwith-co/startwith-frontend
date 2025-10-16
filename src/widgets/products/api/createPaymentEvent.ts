import api from '@/shared/api/client-api';
import { v4 as uuid } from 'uuid';
import { ApiResponse } from '@/shared/model/apiType';
import { PaymentEventResponse, PaymentEvent } from '../model/type';

export default async function createPaymentEvent({
  consumerSeq,
  vendorSeq,
  category,
  paymentEventName,
  amount,
}: PaymentEvent) {
  const paymentEventUniqueType = uuid();
  const body = new FormData();

  const requestPayload = {
    consumerSeq,
    vendorSeq,
    category,
    paymentEventName,
    amount,
    paymentEventUniqueType,
  };

  body.append(
    'request',
    new Blob([JSON.stringify(requestPayload)], { type: 'application/json' }),
  );

  body.append(
    'contractConfirmationUrl',
    new File(['%PDF-1.4\n%…'], 'temp.pdf', { type: 'application/pdf' }),
  );
  body.append(
    'refundPolicyUrl',
    new File(['%PDF-1.4\n%…'], 'temp.pdf', { type: 'application/pdf' }),
  );

  const response = await api
    .post<
      ApiResponse<PaymentEventResponse>
    >('api/payment-service/payment-event', { body })
    .json();
  return response.data;
}
