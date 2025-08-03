import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import { SolutionDetailProps } from '../model/type';

export default async function getSolution(vendorSeq: string, category: string) {
  const response = await serverApi
    .get<ApiResponse<SolutionDetailProps>>(
      `api/solution-service/solution/category?vendorSeq=${vendorSeq}&category=${category.toUpperCase()}`,
      {
        cache: 'force-cache',
        next: {
          tags: [`solution-${vendorSeq}-${category}`],
        },
      },
    )
    .json();

  return response.data;
}
