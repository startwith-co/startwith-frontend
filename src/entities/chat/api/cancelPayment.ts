import { ApiResponse } from '@/shared/model/apiType';
import api from '@/shared/api/index-api';
import { PaymentConflictProps } from '../model/type';

async function cancelPayment(
  solutionCategory: string,
  consumerSeq: number,
  vendorSeq: number,
) {
  const res: ApiResponse<PaymentConflictProps> = await api
    .get('api/payment-service/payment-event/conflict', {
      searchParams: {
        category: solutionCategory,
        consumerSeq: String(consumerSeq),
        vendorSeq: String(vendorSeq),
      },
    })
    .json();
  return res;
}

export default cancelPayment;
