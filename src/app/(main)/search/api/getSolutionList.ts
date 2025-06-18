import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import SolutionProps from '../../../../views/search/model/type';

export default async function getSolutionList({
  category,
  industry,
  budget = '전체',
  keyword,
  page = '1',
}: {
  category?: string;
  industry?: string;
  budget?: string;
  keyword?: string;
  page?: string;
}) {
  const start = (Number(page) - 1) * 15;
  const end = Number(page) * 15;

  const query =
    // eslint-disable-next-line
    `api/solution-service/solution/list?` +
    (category ? `category=${category}&` : '') +
    (industry ? `industry=${industry}&` : '') +
    (budget ? `budget=${budget}&` : '') +
    (keyword ? `keyword=${keyword}&` : '') +
    `start=${start}&end=${end}`;

  const response = await serverApi
    .get<ApiResponse<SolutionProps[]>>(query, {
      cache: 'force-cache',
      next: {
        tags: ['solutionList'],
      },
    })
    .json();

  return response.data;
}
