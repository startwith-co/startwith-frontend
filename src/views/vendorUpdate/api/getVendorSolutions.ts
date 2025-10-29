'use server';

import { ApiResponse } from '@/shared/model/apiType';
import ErrorHandler from '@/shared/lib/error-message';
import serverApi from '@/shared/api/server-api';
import { VendorSolutionType } from '../model/vendorSolutionType';

async function getVendorSolutions(vendorSeq: number) {
  try {
    const response = await serverApi
      .get<
        ApiResponse<VendorSolutionType[]>
      >(`api/b2b-service/vendor/solution?vendorSeq=${vendorSeq}`)
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
export default getVendorSolutions;
