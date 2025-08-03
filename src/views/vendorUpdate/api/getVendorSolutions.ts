import api from '@/shared/api/index-api';
import { ApiResponse } from '@/shared/model/apiType';
import { VendorSolutionType } from '../model/vendorSolutionType';

export default async function getVendorSolutions(vendorSeq: string) {
  const response = await api
    .get<
      ApiResponse<VendorSolutionType[]>
    >(`api/b2b-service/vendor/solution?vendorSeq=${vendorSeq}`)
    .json();

  return response.data;
}
