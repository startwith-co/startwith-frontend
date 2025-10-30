import { ApiResponse } from '@/shared/model/apiType';
import api from '@/shared/api/client-api';
import { PaymentConflictProps } from '../model/type';

async function cancelPayment(
  solutionCategory: string,
  consumerSeq: string,
  vendorSeq: string,
) {
  const res: ApiResponse<PaymentConflictProps> = await api
    .get('api/payment-service/payment-event/conflict', {
      searchParams: {
        category: solutionCategory,
        consumerSeq,
        vendorSeq,
      },
    })
    .json();
  return res;
}

export default cancelPayment;
