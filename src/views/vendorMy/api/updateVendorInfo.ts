'use server';

import serverApi from '@/shared/api/server-api';
import { revalidateTag } from 'next/cache';
import { VendorUpdateSchema } from '../model/vendor-update-schema';

export default async function updateVendorInfo(data: VendorUpdateSchema) {
  const formData = new FormData();
  formData.append('vendorBannerImageUrl', data.vendorBannerImageUrl);
  if (data.clientInfos && data.clientInfos.length > 0) {
    data.clientInfos.forEach((file) => {
      if (file) {
        formData.append('clientInfos', file);
      }
    });
  }
  const jsonPart = {
    vendorSeq: data.vendorSeq,
    vendorName: data.vendorName,
    managerName: data.managerName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    audit: data.audit,
    accountNumber: data.accountNumber,
    bank: data.bank,
    vendorExplanation: data.vendorExplanation,
    weekdayAvailable: data.weekdayAvailable,
    weekdayStartTime: data.weekdayStartTime,
    weekdayEndTime: data.weekdayEndTime,
    weekendAvailable: data.weekendAvailable,
    weekendStartTime: data.weekendStartTime,
    weekendEndTime: data.weekendEndTime,
    holidayAvailable: data.holidayAvailable,
    holidayStartTime: data.holidayStartTime,
    holidayEndTime: data.holidayEndTime,
    orderCount: data.orderCount,
    clientCount: data.clientCount,
    stats: data.stats,
  };

  formData.append(
    'request',
    new Blob([JSON.stringify(jsonPart)], { type: 'application/json' }),
  );

  await serverApi
    .put(`api/b2b-service/vendor`, {
      body: formData,
    })
    .json();
  revalidateTag(`vendorInfo-${data.vendorSeq}`);
}
