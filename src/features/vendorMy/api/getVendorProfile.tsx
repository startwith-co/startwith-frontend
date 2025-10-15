'use server';

import { ApiResponse } from '@/shared/model/apiType';
import ErrorHandler from '@/shared/lib/error-message';
import { VendorInfoProps } from '@/views/vendorMy/model/type';
import serverApi from '@/shared/api/server-api';

async function getVendorProfile(vendorSeq: number) {
  try {
    const response: ApiResponse<VendorInfoProps> = await serverApi
      .get(`api/b2b-service/vendor?vendorSeq=${vendorSeq}`, {
        next: { tags: ['vendor/my/profile'] },
      })
      .json();
    return {
      ok: true,
      data: response.data,
      status: 200,
    };
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}

export default getVendorProfile;
