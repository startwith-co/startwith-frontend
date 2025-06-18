import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';

async function postResetLink(
  isVendor: boolean,
  email: string,
  company: string,
) {
  let response;
  if (isVendor) {
    response = await serverApi
      .post<ApiResponse<string>>('api/b2b-service/vendor/resetLink', {
        json: { email, vendorName: company },
      })
      .json();
  } else {
    response = await serverApi
      .post<ApiResponse<string>>('api/b2b-service/consumer/resetLink', {
        json: { email, consumerName: company },
      })
      .json();
  }

  return response;
}

export default postResetLink;
