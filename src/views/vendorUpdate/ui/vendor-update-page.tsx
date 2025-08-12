'use client';

import { Button } from '@/shared/ui/button';
import VendorDetailInfo from '@/widgets/vendorRegister/ui/vendor-detail-info';
import VendorKeyword from '@/widgets/vendorRegister/ui/vendor-keyword';
import VendorSaleInfo from '@/widgets/vendorRegister/ui/vendor-sale-info';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import VendorNormalInfo from '@/widgets/vendorRegister/ui/vendor-normal-info';
import { UpdateSolutionProps } from '@/app/(vendor)/vendor/update/[id]/model/updateSolutionType';
import { categoryToKo } from '@/shared/model/categoryMap';
import urlToFile from '@/views/vendorMy/api/urlToFile';
import {
  VendorRegisterSchema,
  vendorRegisterSchema,
} from '../model/vendor-update-schema';
import VendorSubmitModal from './vendor-submit-modal';
import updateSolution from '../api/updateSolution';

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
  const [isLoading, setIsLoading] = useState(false);

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
        | '불량 검출 · 예측(비전 검사)'
        | '설비 이상 및 고장 예측(예지보전)'
        | '실시간 공정 상태 모니터링(공정 이상 감지)'
        | 'MES 재고관리(공정 재고관리)'
        | undefined,
      industry: solution.industry.join(','),
      recommendedCompanySize: solution.recommendedCompanySize,
      solutionImplementationType: solution.solutionImplementationType,
      amount: solution.amount.toString(),
      duration: solution.duration.toString(),
      solutionEffect: solution.solutionEffect,
      keyword: solution.keywords || [],
    },
  });

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const [representFile, pdfFile] = await Promise.all([
          solution.representImageUrl
            ? urlToFile(solution.representImageUrl, 'represent-image.jpg')
            : new File([], ''),
          solution.descriptionPdfUrl
            ? urlToFile(solution.descriptionPdfUrl, 'description.pdf')
            : new File([], ''),
        ]);

        methods.reset({
          ...methods.getValues(),
          representImageUrl: representFile,
          descriptionPdfUrl: pdfFile,
        });
      } catch (e) {
        toast.error('파일을 불러오는데 실패했습니다.');
      }
    };

    loadFiles();
  }, [solution.representImageUrl, solution.descriptionPdfUrl]);

  const onSubmit = async (
    updateData: VendorRegisterSchema,
    prevCategory: string,
  ) => {
    setIsLoading(true);
    try {
      await updateSolution(updateData, prevCategory);
      setOpenDialog(true);
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((updateData) =>
          onSubmit(updateData, category),
        )}
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
          <Button asChild={false} type="submit" disabled={isLoading}>
            {isLoading ? '수정 중...' : '수정하기'}
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
