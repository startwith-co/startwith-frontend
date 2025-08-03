import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import { UpdateSolutionProps } from '../model/updateSolutionType';

export default async function getUpdateSolution({
  solutionSeq,
}: {
  solutionSeq: string;
}) {
  const response = await serverApi
    .get<
      ApiResponse<UpdateSolutionProps>
    >(`api/solution-service/solution?solutionSeq=${solutionSeq}`)
    .json();

  return response.data;
}
