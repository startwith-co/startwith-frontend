import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import BoardCountType from '../model/type';

export default async function getBoardCount(vendorSeq: number) {
  const res = await serverApi<ApiResponse<BoardCountType>>(
    `api/b2b-service/dashboard/vendor/status?vendorSeq=${vendorSeq}`,
  ).json();

  return res;
}
