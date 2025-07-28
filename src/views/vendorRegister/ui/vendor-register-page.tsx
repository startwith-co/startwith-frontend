'use client';

import { Button } from '@/shared/ui/button';
import VendorDetailInfo from '@/widgets/vendorRegister/ui/vendor-detail-info';
import VendorKeyword from '@/widgets/vendorRegister/ui/vendor-keyword';
import VendorNormalInfo from '@/widgets/vendorRegister/ui/vendor-normal-info';
import VendorSaleInfo from '@/widgets/vendorRegister/ui/vendor-sale-info';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useCurrentSession from '@/shared/model/useCurrentSession';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  VendorRegisterSchema,
  vendorRegisterSchema,
} from '../model/vendor-register-schema';
import VendorSubmitModal from './vendor-submit-modal';
import registerSolution from '../api/register-solution';

export default function VendorRegisterPage() {
  const { session } = useCurrentSession();

  const [openDialog, setOpenDialog] = useState(false);

  const methods = useForm({
    resolver: zodResolver(vendorRegisterSchema),
    defaultValues: {
      representImageUrl: new File([], ''),
      descriptionPdfUrl: new File([], ''),
      vendorSeq: session?.vendorSeq || 0,
      solutionName: '',
      solutionDetail: '',
      category: '',
      industry: '',
      recommendedCompanySize: [],
      solutionImplementationType: [],
      amount: '',
      duration: '',
      solutionEffect: [],
      keyword: [],
    },
  });

  const onSubmit = async (data: VendorRegisterSchema) => {
    try {
      await registerSolution(data);
      setOpenDialog(true);
    } catch (error: any) {
      toast.error(error.message);
    }
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
