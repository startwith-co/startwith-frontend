'use server';

import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import { VendorUpdateSchema } from '../model/vendor-update-schema';

export default async function updateVendorInfo(data: VendorUpdateSchema) {
  const formData = new FormData();
  formData.append('vendorBannerImageUrl', data.vendorBannerImageUrl);
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
  };

  formData.append(
    'request',
    new Blob([JSON.stringify(jsonPart)], { type: 'application/json' }),
  );

  const response = await serverApi
    .put<ApiResponse<VendorUpdateSchema>>(`api/b2b-service/vendor`, {
      body: formData,
    })
    .json();

  return response.data;
}
