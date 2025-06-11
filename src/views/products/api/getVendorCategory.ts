import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import { VendorCategoryProps } from '../model/type';

export default async function getVendorCategory(vendorSeq: string) {
  const response = await serverApi
    .get<
      ApiResponse<VendorCategoryProps[]>
    >(`api/b2b-service/vendor/category?vendorSeq=${vendorSeq}`)
    .json();

  return response.data;
}
