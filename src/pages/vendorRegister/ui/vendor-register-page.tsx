'use client';

import api from '@/shared/api/index-api';
import { Button } from '@/shared/ui/button';
import VendorDetailInfo from '@/widgets/vendorRegister/ui/vendor-detail-info';
import VendorKeyword from '@/widgets/vendorRegister/ui/vendor-keyword';
import VendorNormalInfo from '@/widgets/vendorRegister/ui/vendor-normal-info';
import VendorSaleInfo from '@/widgets/vendorRegister/ui/vendor-sale-info';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import {
  VendorRegisterSchema,
  vendorRegisterSchema,
} from '../model/vendor-register-schema';
import vendorCategoryMapping from '../utils/vendor-category-mapping';

export default function VendorRegisterPage() {
  const session = useSession();

  const methods = useForm({
    resolver: zodResolver(vendorRegisterSchema),
    defaultValues: {
      representImageUrl: new File([], ''),
      descriptionPdfUrl: new File([], ''),
      vendorSeq: 1,
      solutionName: '',
      solutionDetail: '',
      category: '',
      industry: '',
      recommendedCompanySize: [],
      solutionImplementationType: 'string',
      specialist: 'string',
      amount: '',
      duration: '',
      solutionEffect: [],
      keyword: [],
    },
  });

  useEffect(() => {
    if (session.status === 'authenticated' && session.data?.vendorSeq) {
      methods.reset({
        ...methods.getValues(),
        vendorSeq: session.data.vendorSeq,
      });
    }
  }, [session, methods]);

  const onSubmit = methods.handleSubmit(async (data: VendorRegisterSchema) => {
    const formData = new FormData();

    formData.append('representImageUrl', data.representImageUrl);
    formData.append('descriptionPdfUrl', data.descriptionPdfUrl);

    const jsonPart = {
      vendorSeq: methods.getValues('vendorSeq'),
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

    await api.post(`api/solution-service/solution`, {
      body: formData,
    });
  });

  return (
    <FormProvider {...methods}>
      <form className="flex w-full flex-col gap-7.5 pr-10" onSubmit={onSubmit}>
        <VendorNormalInfo />
        <VendorSaleInfo />
        <VendorDetailInfo />
        <VendorKeyword />
        <div className="mt-7.5 flex items-center justify-center gap-3.5 font-semibold text-white">
          <Button
            asChild={false}
            className="bg-vendor-gray text-black hover:text-white"
          >
            취소
          </Button>
          <Button asChild={false} type="submit">
            등록하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
