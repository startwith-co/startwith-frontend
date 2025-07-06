'use client';

import EditVendorInfo from '@/features/vendorMy/ui/edit-vendor-info';
import EditVendorTextArea from '@/features/vendorMy/ui/edit-vendor-text-area';
import VendorTimeSetting from '@/widgets/vendorMy/ui/vendor-time-setting';
import VendorUploadBanner from '@/widgets/vendorMy/ui/vendor-upload-banner';
import VendorTotalSetting from '@/widgets/vendorMy/ui/vendor-total-setting';
import VendorUploadLogo from '@/widgets/vendorMy/ui/vendor-upload-logo';
import VendorCustomerOverview from '@/widgets/vendorMy/ui/vendor-customer-overview';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import {
  VendorUpdateSchema,
  vendorUpdateSchema,
} from '../model/vendor-update-schema';
import { VendorInfoProps } from '../model/type';
import updateVendorInfo from '../api/updateVendorInfo';
import urlToFile from '../api/urlToFile';

function VendorMyProfile({ vendorInfo }: { vendorInfo: VendorInfoProps }) {
  const methods = useForm({
    resolver: zodResolver(vendorUpdateSchema),
    defaultValues: {
      vendorBannerImageUrl: undefined,
      vendorSeq: vendorInfo?.vendorSeq || 0,
      vendorName: vendorInfo?.vendorName || '',
      managerName: vendorInfo?.managerName || '',
      phoneNumber: vendorInfo?.phoneNumber || '',
      email: vendorInfo?.email || '',
      audit: vendorInfo?.audit || true,
      accountNumber: vendorInfo?.accountNumber || '',
      bank: vendorInfo?.bank || '',
      vendorExplanation: vendorInfo?.vendorExplanation || '',
      weekdayAvailable: vendorInfo?.weekdayAvailable,
      weekdayStartTime: vendorInfo?.weekdayStartTime || '00:00:00',
      weekdayEndTime: vendorInfo?.weekdayEndTime || '23:59:59',
      weekendAvailable: vendorInfo?.weekendAvailable,
      weekendStartTime: vendorInfo?.weekendStartTime || '00:00:00',
      weekendEndTime: vendorInfo?.weekendEndTime || '23:59:59',
      holidayAvailable: vendorInfo?.holidayAvailable,
      holidayStartTime: vendorInfo?.holidayStartTime || '00:00:00',
      holidayEndTime: vendorInfo?.holidayEndTime || '23:59:59',
      orderCount: vendorInfo?.orderCount || 0,
      clientCount: vendorInfo?.clientCount || 0,
    },
  });

  useEffect(() => {
    if (vendorInfo.vendorBannerImageUrl) {
      urlToFile(vendorInfo.vendorBannerImageUrl, 'banner.jpg').then((file) => {
        methods.setValue('vendorBannerImageUrl', file);
      });
    }
  }, [vendorInfo.vendorBannerImageUrl, methods]);

  const onSubmit = async (data: VendorUpdateSchema) => {
    try {
      await updateVendorInfo(data);
      toast.success('수정이 완료되었습니다.');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-7.5 pr-10"
      >
        <div className="grid grid-cols-2 gap-7.5">
          <EditVendorInfo />
          <EditVendorTextArea />
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-7.5">
          <VendorTimeSetting />
          <VendorUploadBanner />
          <VendorTotalSetting />
          <VendorUploadLogo />
        </div>
        <VendorCustomerOverview />
      </form>
    </FormProvider>
  );
}

export default VendorMyProfile;
