import serverApi from '@/shared/api/server-api';
import { Review } from '@/widgets/products/model/type';
import { ApiResponse } from '@/shared/model/apiType';

async function getReviewList(solutionSeq: number) {
  const response: ApiResponse<Review[]> = await serverApi
    .get(`api/solution-service/review?solutionSeq=${solutionSeq}`)
    .json();
  return response.data;
}

export default getReviewList;
