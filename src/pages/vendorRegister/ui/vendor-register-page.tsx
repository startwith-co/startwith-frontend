'use client';

import { Button } from '@/shared/ui/button';
import VendorDetailInfo from '@/widgets/vendorRegister/ui/vendor-detail-info';
import VendorKeyword from '@/widgets/vendorRegister/ui/vendor-keyword';
import VendorNormalInfo from '@/widgets/vendorRegister/ui/vendor-normal-info';
import VendorSaleInfo from '@/widgets/vendorRegister/ui/vendor-sale-info';
import ky from 'ky';
import { FormProvider, useForm } from 'react-hook-form';

export default function VendorRegisterPage() {
  const methods = useForm({
    defaultValues: {
      representImageUrl: '',
      descriptionPdfUrl: '',
      vendorSeq: 1,
      solutionName: '',
      solutionDetail: '',
      category: '',
      industry: '',
      recommendedCompanySize: [],
      solutionImplementationType: '',
      specialist: '',
      amount: null,
      duration: null,
      solutionEffect: [],
      keyword: [''],
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
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

    const res = await ky
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/solution-service/solution`,
        {
          body: formData,
        },
      )
      .json();

    console.log(res);
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
