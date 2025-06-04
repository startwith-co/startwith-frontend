'use client';

import { Button } from '@/shared/ui/button';
import VendorDetailInfo from '@/widgets/vendorRegister/ui/vendor-detail-info';
import VendorKeyword from '@/widgets/vendorRegister/ui/vendor-keyword';
import VendorNormalInfo from '@/widgets/vendorRegister/ui/vendor-normal-info';
import VendorSaleInfo from '@/widgets/vendorRegister/ui/vendor-sale-info';
import { FormProvider, useForm } from 'react-hook-form';

export default function VendorRegisterPage() {
  const methods = useForm({
    defaultValues: {
      representImageUrl: '',
      descriptionPdfUrl: '',
      vendorSeq: 0,
      solutionName: '',
      solutionDetail: '',
      category: '',
      industry: '',
      recommendedCompanySize: '',
      solutionImplementationType: '',
      specialist: '',
      amount: null,
      duration: null,
      solutionEffect: [],
      keyword: [''],
    },
  });

  const onSubmit = methods.handleSubmit((data) => console.log(data));

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
