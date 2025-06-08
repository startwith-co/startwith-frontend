import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import { VendorInfoProps } from '../model/type';

export default async function getVendorInfo(vendorSeq: number) {
  const response = await serverApi
    .get<ApiResponse<VendorInfoProps>>(
      `api/b2b-service/vendor?vendorSeq=${String(vendorSeq)}`,
      {
        cache: 'force-cache',
        next: {
          tags: [`vendorInfo-${vendorSeq}`],
        },
      },
    )
    .json();

  return response.data;
}
