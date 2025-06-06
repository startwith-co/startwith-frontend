'use client';

import EditVendorInfo from '@/features/vendorMy/ui/edit-vendor-info';
import Image from 'next/image';
import EditVendorTextArea from '@/features/vendorMy/ui/edit-vendor-text-area';
import VendorTimeSetting from '@/widgets/vendorMy/ui/vendor-time-setting';
import VendorUploadBanner from '@/widgets/vendorMy/ui/vendor-upload-banner';
import VendorTotalSetting from '@/widgets/vendorMy/ui/vendor-total-setting';
import VendorUploadLogo from '@/widgets/vendorMy/ui/vendor-upload-logo';
import VendorCustomerOverview from '@/widgets/vendorMy/ui/vendor-customer-overview';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vendorUpdateSchema } from '../model/vendor-update-schema';
import { VendorInfoProps } from '../model/type';

function VendorMyProfile({ vendorInfo }: { vendorInfo: VendorInfoProps }) {
  const methods = useForm({
    resolver: zodResolver(vendorUpdateSchema),
    defaultValues: {
      vendorBannerImageUrl: new File([], ''),
      vendorSeq: vendorInfo?.vendorSeq || 0,
      vendorName: vendorInfo?.vendorName || '',
      managerName: vendorInfo?.managerName || '',
      phoneNumber: vendorInfo?.phoneNumber || '',
      email: vendorInfo?.email || '',
      audit: vendorInfo?.audit || true,
      accountNumber: vendorInfo?.accountNumber || '',
      bank: vendorInfo?.bank || 'string',
      vendorExplanation: vendorInfo?.vendorExplanation || 'string',
      weekdayAvailable: vendorInfo?.weekdayAvailable || true,
      weekdayStartTime: {
        hour: vendorInfo?.weekdayStartTime?.hour || 0,
        minute: vendorInfo?.weekdayStartTime?.minute || 0,
        second: vendorInfo?.weekdayStartTime?.second || 0,
        nano: vendorInfo?.weekdayStartTime?.nano || 0,
      },
      weekdayEndTime: {
        hour: vendorInfo?.weekdayEndTime?.hour || 0,
        minute: vendorInfo?.weekdayEndTime?.minute || 0,
        second: vendorInfo?.weekdayEndTime?.second || 0,
        nano: vendorInfo?.weekdayEndTime?.nano || 0,
      },
      weekendAvailable: vendorInfo?.weekendAvailable || true,
      weekendStartTime: {
        hour: vendorInfo?.weekendStartTime?.hour || 0,
        minute: vendorInfo?.weekendStartTime?.minute || 0,
        second: vendorInfo?.weekendStartTime?.second || 0,
        nano: vendorInfo?.weekendStartTime?.nano || 0,
      },
      weekendEndTime: {
        hour: vendorInfo?.weekendEndTime?.hour || 0,
        minute: vendorInfo?.weekendEndTime?.minute || 0,
        second: vendorInfo?.weekendEndTime?.second || 0,
        nano: vendorInfo?.weekendEndTime?.nano || 0,
      },
      holidayAvailable: vendorInfo?.holidayAvailable || true,
      holidayStartTime: {
        hour: vendorInfo?.holidayStartTime?.hour || 0,
        minute: vendorInfo?.holidayStartTime?.minute || 0,
        second: vendorInfo?.holidayStartTime?.second || 0,
        nano: vendorInfo?.holidayStartTime?.nano || 0,
      },
      holidayEndTime: {
        hour: vendorInfo?.holidayEndTime?.hour || 0,
        minute: vendorInfo?.holidayEndTime?.minute || 0,
        second: vendorInfo?.holidayEndTime?.second || 0,
        nano: vendorInfo?.holidayEndTime?.nano || 0,
      },
      orderCount: vendorInfo?.orderCount || 0,
      clientCount: vendorInfo?.clientCount || 0,
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log(data);
        })}
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
