import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import SolutionProps from '../model/type';

export default async function getSolutionList({
  solutionCategory,
  industryCategory,
  budget = '전체',
  page = '1',
}: {
  solutionCategory?: string;
  industryCategory?: string;
  budget?: string;
  page?: string;
}) {
  const start = (Number(page) - 1) * 15;
  const end = Number(page) * 15;

  const query =
    // eslint-disable-next-line
    `api/solution-service/solution/list?` +
    (solutionCategory ? `category=${solutionCategory}&` : '') +
    (industryCategory ? `industry=${industryCategory}&` : '') +
    (budget ? `budget=${budget}&` : '') +
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
