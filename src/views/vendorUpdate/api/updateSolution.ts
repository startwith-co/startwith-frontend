'use server';

import { auth } from '@/auth';
import serverApi from '@/shared/api/server-api';
import { revalidateTag } from 'next/cache';
import { solutionCategoryToValue } from '@/shared/model/getCategoryList';
import { VendorRegisterSchema } from '../model/vendor-update-schema';

export default async function updateSolution(
  data: VendorRegisterSchema,
  prevCategory: string,
) {
  const session = await auth();
  const formData = new FormData();

  formData.append('representImageUrl', data.representImageUrl);
  formData.append('descriptionPdfUrl', data.descriptionPdfUrl);

  const jsonPart = {
    vendorSeq: session?.vendorSeq || 0,
    solutionName: data.solutionName,
    solutionDetail: data.solutionDetail,
    prevCategory,
    nextCategory: solutionCategoryToValue[data.category],
    recommendedCompanySize: data.recommendedCompanySize.join(','),
    solutionImplementationType: data.solutionImplementationType.join(','),
    amount: Number(data.amount),
    duration: Number(data.duration),
    solutionEffect: data.solutionEffect,
    keyword: data.keyword,
  };

  formData.append(
    'request',
    new Blob([JSON.stringify(jsonPart)], { type: 'application/json' }),
  );

  await serverApi.put(`api/solution-service/solution`, {
    body: formData,
  });
  revalidateTag(`solutionList`);
  revalidateTag(
    `solution-${session?.vendorSeq}-${solutionCategoryToValue[data.category]}`,
  );
}
