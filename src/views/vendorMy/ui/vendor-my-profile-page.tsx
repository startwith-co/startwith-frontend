'use client';

import EditVendorInfo from '@/features/vendorMy/ui/edit-vendor-info';
import EditVendorTextArea from '@/features/vendorMy/ui/edit-vendor-text-area';
import VendorTimeSetting from '@/widgets/vendorMy/ui/vendor-time-setting';
import VendorUploadBanner from '@/widgets/vendorMy/ui/vendor-upload-banner';
import VendorTotalSetting from '@/widgets/vendorMy/ui/vendor-total-setting';
import VendorUploadLogo from '@/widgets/vendorMy/ui/vendor-upload-logo';
import VendorCustomerOverview from '@/widgets/vendorMy/ui/vendor-customer-overview';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import {
  VendorUpdateSchema,
  getPartialSchema,
} from '../model/vendor-update-schema';
import { VendorInfoProps } from '../model/type';
import updateVendorInfo from '../api/updateVendorInfo';
import urlToFile from '../api/urlToFile';

function VendorMyProfile({ vendorInfo }: { vendorInfo: VendorInfoProps }) {
  const methods = useForm<VendorUpdateSchema>({
    defaultValues: {
      profileImage: undefined,
      vendorBannerImageUrl: undefined,
      clientInfos: [],
      vendorSeq: vendorInfo?.vendorSeq || 0,
      vendorName: vendorInfo?.vendorName || '',
      managerName: vendorInfo?.managerName || '',
      phoneNumber: vendorInfo?.phoneNumber || '',
      email: vendorInfo?.email || '',
      audit: vendorInfo?.audit ?? true,
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
      stats:
        vendorInfo?.stats.length > 0
          ? vendorInfo?.stats
          : [
              { label: '10억 미만', percentage: 0, statType: 'SALES_SIZE' },
              {
                label: '10억 초과 50억 미만',
                percentage: 0,
                statType: 'SALES_SIZE',
              },
              {
                label: '50억 초과 100억 미만',
                percentage: 0,
                statType: 'SALES_SIZE',
              },
              {
                label: '100억 초과 150억 미만',
                percentage: 0,
                statType: 'SALES_SIZE',
              },
              { label: '150억 초과', percentage: 0, statType: 'SALES_SIZE' },
              { label: '10인 미만', percentage: 0, statType: 'EMPLOYEES_SIZE' },
              {
                label: '10인 이상 30인 미만',
                percentage: 0,
                statType: 'EMPLOYEES_SIZE',
              },
              {
                label: '30인 이상 50인 미만',
                percentage: 0,
                statType: 'EMPLOYEES_SIZE',
              },
              {
                label: '50인 이상 100인 미만',
                percentage: 0,
                statType: 'EMPLOYEES_SIZE',
              },
              {
                label: '100인 이상',
                percentage: 0,
                statType: 'EMPLOYEES_SIZE',
              },
            ],
    },
  });

  useEffect(() => {
    if (vendorInfo.vendorBannerImageUrl) {
      urlToFile(vendorInfo.vendorBannerImageUrl, 'banner.jpg').then((file) => {
        methods.setValue('vendorBannerImageUrl', file);
      });
    }
    if (vendorInfo.profileImage) {
      urlToFile(vendorInfo.profileImage, 'profile.jpg').then((file) => {
        methods.setValue('profileImage', file);
      });
    }
    if (vendorInfo.clientResponse?.length) {
      Promise.all(
        vendorInfo.clientResponse.map((client) =>
          urlToFile(client.logoImageUrl, 'logo.jpg'),
        ),
      ).then((files) => {
        methods.setValue('clientInfos', files);
      });
    }
  }, [vendorInfo, methods]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (fields: (keyof VendorUpdateSchema)[]) => {
    setIsLoading(true);
    const partialSchema = getPartialSchema(fields);

    const currentValues = methods.getValues();
    const pickedValues = fields.reduce(
      (acc, key) => ({ ...acc, [key]: currentValues[key] }),
      {} as Partial<VendorUpdateSchema>,
    );

    const result = partialSchema.safeParse(pickedValues);

    fields.forEach((field) => methods.clearErrors(field));

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      (
        Object.entries(fieldErrors) as [
          keyof VendorUpdateSchema,
          string[] | undefined,
        ][]
      ).forEach(([name, messages]) => {
        methods.setError(name, {
          type: 'manual',
          message: messages?.[0] || '',
        });
      });

      return;
    }

    try {
      await updateVendorInfo({
        ...vendorInfo,
        ...result.data,
      } as any);
      toast.success('수정이 완료되었습니다.');
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-7.5 pr-10">
        <div className="grid grid-cols-2 gap-7.5">
          <EditVendorInfo
            onSave={() =>
              onSubmit([
                'profileImage',
                'vendorName',
                'managerName',
                'phoneNumber',
                'email',
                'accountNumber',
                'bank',
              ])
            }
            isLoading={isLoading}
          />
          <EditVendorTextArea
            onSave={() => onSubmit(['vendorExplanation'])}
            isLoading={isLoading}
          />
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-7.5">
          <VendorTimeSetting
            onSave={() =>
              onSubmit([
                'weekdayAvailable',
                'weekdayStartTime',
                'weekdayEndTime',
                'weekendAvailable',
                'weekendStartTime',
                'weekendEndTime',
                'holidayAvailable',
                'holidayStartTime',
                'holidayEndTime',
              ])
            }
            isLoading={isLoading}
          />
          <VendorUploadBanner
            onSave={() => onSubmit(['vendorBannerImageUrl'])}
            isLoading={isLoading}
          />
          <VendorTotalSetting
            onSave={() => onSubmit(['orderCount', 'clientCount'])}
            isLoading={isLoading}
          />
          <VendorUploadLogo
            onSave={() => onSubmit(['clientInfos'])}
            isLoading={isLoading}
          />
        </div>
        <VendorCustomerOverview
          onSave={() => onSubmit(['stats'])}
          isLoading={isLoading}
        />
      </div>
    </FormProvider>
  );
}

export default VendorMyProfile;
