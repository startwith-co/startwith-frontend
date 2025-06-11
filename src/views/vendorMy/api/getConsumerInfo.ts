import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import { ConsumerInfoProps } from '../model/type';

export default async function getConsumerInfo(consumerSeq: number) {
  const response = await serverApi
    .get<ApiResponse<ConsumerInfoProps>>(
      `api/b2b-service/consumer?consumerSeq=${String(consumerSeq)}`,
      {
        cache: 'force-cache',
        next: {
          tags: [`consumerInfo-${consumerSeq}`],
        },
      },
    )
    .json();

  return response.data;
}
