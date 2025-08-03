'use client';

import { Button } from '@/shared/ui/button';
import VendorDetailInfo from '@/widgets/vendorRegister/ui/vendor-detail-info';
import VendorKeyword from '@/widgets/vendorRegister/ui/vendor-keyword';
import VendorSaleInfo from '@/widgets/vendorRegister/ui/vendor-sale-info';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'react-toastify';
import VendorNormalInfo from '@/widgets/vendorRegister/ui/vendor-normal-info';
import { UpdateSolutionProps } from '@/app/(vendor)/vendor/update/[id]/model/updateSolutionType';
import { categoryToKo } from '@/shared/model/categoryMap';
import {
  VendorRegisterSchema,
  vendorRegisterSchema,
} from '../model/vendor-update-schema';
import VendorSubmitModal from './vendor-submit-modal';

export default function VendorUpdatePage({
  solution,
  vendorId,
  category,
}: {
  solution: UpdateSolutionProps;
  vendorId: number;
  category: string;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  const methods = useForm({
    resolver: zodResolver(vendorRegisterSchema),
    defaultValues: {
      representImageUrl: new File([], ''),
      descriptionPdfUrl: new File([], ''),
      vendorSeq: vendorId,
      solutionName: solution.solutionName,
      solutionDetail: solution.solutionDetail,
      category: (categoryToKo[category] || '') as
        | ''
        | '불량 검출·예측(비전 검사)'
        | '설비 이상 및 고장 예측(예지보전)'
        | '실시간 공정 상태 모니터링(공정 이상 감지)'
        | 'MES 재고관리(공정 재고관리)'
        | undefined,
      industry: solution.industry.join(','),
      recommendedCompanySize: solution.recommendedCompanySize,
      solutionImplementationType: solution.solutionImplementationType,
      amount: solution.amount,
      duration: solution.duration.toString(),
      solutionEffect: [],
      keyword: [],
    },
  });

  const onSubmit = async (data: VendorRegisterSchema) => {
    // try {
    //   await registerSolution(data);
    //   setOpenDialog(true);
    // } catch (error: any) {
    //   toast.error(error.message);
    // }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-7.5 pr-10"
      >
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
      <VendorSubmitModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </FormProvider>
  );
}
