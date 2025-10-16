import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import ErrorHandler from '@/shared/lib/error-message';
import { ConsumerInfoProps } from '../../../views/vendorMy/model/type';

async function getConsumerInfo(consumerSeq: number) {
  try {
    const response: ApiResponse<ConsumerInfoProps> = await serverApi
      .get<ApiResponse<ConsumerInfoProps>>(
        `api/b2b-service/consumer?consumerSeq=${String(consumerSeq)}`,
        {
          cache: 'force-cache',
          next: {
            revalidate: 3600,
            tags: ['consumer/my/profile'],
          },
        },
      )
      .json();

    return {
      ok: true,
      data: response.data,
      status: 200,
    };
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}

export default getConsumerInfo;
