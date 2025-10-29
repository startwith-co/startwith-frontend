'use server';

import serverApi from '@/shared/api/server-api';
import { revalidateTag } from 'next/cache';

export default async function deleteSolution(solutionSeq: string) {
  await serverApi.delete(
    `api/solution-service/solution?solutionSeq=${solutionSeq}`,
  );
  revalidateTag(`vendor/solution`);
}
