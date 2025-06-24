import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import { PaymentInfoProps } from '../model/type';

interface GetDashboardProps {
  consumerSeq: number;
  paymentStatus?: string;
  start?: number;
  end?: number;
}

export default async function getDashboard({
  consumerSeq,
  paymentStatus,
  start,
  end,
}: GetDashboardProps) {
  const response = await serverApi
    .get<ApiResponse<PaymentInfoProps[]>>(
      `api/b2b-service/dashboard/consumer?consumerSeq=${consumerSeq}&${paymentStatus ? `paymentStatus=${paymentStatus}` : ''}&start=${start}&end=${end}`,
      {
        cache: 'force-cache',
        next: {
          tags: [`my-profile-${consumerSeq}-${paymentStatus}-${start}-${end}`],
        },
      },
    )
    .json();

  return response.data;
}
