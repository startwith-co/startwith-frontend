import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import PaymentInfoProps from '../model/type';

export default async function getPaymentInfo({
  vendorSeq,
  consumerSeq,
}: {
  vendorSeq: string;
  consumerSeq: string;
}) {
  const response = await serverApi
    .get<
      ApiResponse<PaymentInfoProps[]>
    >(`api/payment-service/payment-event?consumerSeq=${consumerSeq}&vendorSeq=${vendorSeq}`)
    .json();

  return response.data;
}
