import api from '@/shared/api/client-api';
import { ApiResponse } from '@/shared/model/apiType';
import VendorTableProps from '../model/type';

export default async function getVendorTable(
  vendorSeq: string,
  paymentStatus: string,
  start: string,
  end: string,
) {
  let paymentStatusParam = '';
  switch (paymentStatus) {
    case '전체':
      paymentStatusParam = '';
      break;
    case '정산 대기':
      paymentStatusParam = '&paymentStatus=DONE';
      break;
    case '정산 완료':
      paymentStatusParam = '&paymentStatus=SETTLED';
      break;
    default:
      paymentStatusParam = '';
      break;
  }
  const startParam = start ? `&start=${start}` : '';
  const endParam = end ? `&end=${end}` : '';
  const res = await api
    .get(
      `api/b2b-service/dashboard/vendor?vendorSeq=${vendorSeq}${paymentStatusParam}${startParam}${endParam}`,
    )
    .json<ApiResponse<VendorTableProps[]>>();

  return res;
}
