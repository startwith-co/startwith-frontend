'use server';

import { auth } from '@/auth';
import serverApi from '@/shared/api/server-api';
import { revalidateTag } from 'next/cache';
import { VendorRegisterSchema } from '../model/vendor-register-schema';
import vendorCategoryMapping from '../utils/vendor-category-mapping';

export default async function registerSolution(data: VendorRegisterSchema) {
  const session = await auth();
  const formData = new FormData();

  formData.append('representImageUrl', data.representImageUrl);
  formData.append('descriptionPdfUrl', data.descriptionPdfUrl);

  const jsonPart = {
    vendorSeq: session?.vendorSeq || 0,
    solutionName: data.solutionName,
    solutionDetail: data.solutionDetail,
    category: vendorCategoryMapping(data.category),
    industry: data.industry,
    recommendedCompanySize: data.recommendedCompanySize.join(','),
    solutionImplementationType: data.solutionImplementationType,
    specialist: data.specialist,
    amount: Number(data.amount),
    duration: Number(data.duration),
    solutionEffect: data.solutionEffect,
    keyword: data.keyword,
  };
  formData.append(
    'request',
    new Blob([JSON.stringify(jsonPart)], { type: 'application/json' }),
  );

  await serverApi.post(`api/solution-service/solution`, {
    body: formData,
  });
  revalidateTag(`solutionList`);
}
