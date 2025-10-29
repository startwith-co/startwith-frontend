import { auth } from '@/auth';
import getVendorSolutions from '../api/getVendorSolutions';
import VendorUpdateTable from './vendor-update-table';

async function VendorUpdateTableFrame() {
  const session = await auth();
  const res = await getVendorSolutions(session?.vendorSeq!);

  return (
    <div className="mr-8 w-full rounded-md shadow-md">
      <table className="w-full border-separate border-spacing-0 text-center text-[13px]">
        <thead className="bg-vendor-gray [&>tr>th]:border [&>tr>th]:border-gray-200 [&>tr>th]:py-3">
          <tr className="font-semibold">
            <th>솔루션명</th>
            <th>솔루션 카테고리</th>
            <th>솔루션 가격</th>
            <th>수정하기</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <VendorUpdateTable res={res?.data || []} />
      </table>
    </div>
  );
}
export default VendorUpdateTableFrame;
