'use client';

import api from '@/shared/api/index-api';
import { Button } from '@/shared/ui/button';
import VendorDetailInfo from '@/widgets/vendorRegister/ui/vendor-detail-info';
import VendorKeyword from '@/widgets/vendorRegister/ui/vendor-keyword';
import VendorNormalInfo from '@/widgets/vendorRegister/ui/vendor-normal-info';
import VendorSaleInfo from '@/widgets/vendorRegister/ui/vendor-sale-info';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  VendorRegisterSchema,
  vendorRegisterSchema,
} from '../model/vendor-register-schema';

export default function VendorRegisterPage() {
  const methods = useForm<VendorRegisterSchema>({
    resolver: zodResolver(vendorRegisterSchema),
    defaultValues: {
      representImageUrl: undefined,
      descriptionPdfUrl: undefined,
      vendorSeq: 1,
      solutionName: '',
      solutionDetail: '',
      category: 'KM',
      industry: '',
      recommendedCompanySize: [],
      solutionImplementationType: '',
      specialist: '',
      amount: undefined,
      duration: undefined,
      solutionEffect: [],
      keyword: [''],
    },
  });

  const onSubmit = methods.handleSubmit(async (data: VendorRegisterSchema) => {
    const formData = new FormData();

    formData.append('representImageUrl', data.representImageUrl);
    formData.append('descriptionPdfUrl', data.descriptionPdfUrl);

    const jsonPart = {
      vendorSeq: 1,
      solutionName: 'string',
      solutionDetail: 'string',
      category: 'KM',
      industry: 'string',
      recommendedCompanySize: 'string',
      solutionImplementationType: 'string',
      specialist: 'string',
      amount: 10000,
      duration: 0,
      solutionEffect: [
        {
          effectName: 'string',
          percent: 0,
          direction: 'INCREASE',
        },
      ],
      keyword: ['string'],
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
