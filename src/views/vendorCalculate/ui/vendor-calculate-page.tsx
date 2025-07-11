'use client';

import VendorCalculateBoard from '@/widgets/vendorCalculate/ui/vendor-calculate-board';
import VendorPolicy from '@/widgets/vendorCalculate/ui/vendor-policy';
import VendorSelect from '@/shared/ui/vendor-select';
import BoardCountProps from '@/widgets/vendorHome/model/type';
import React, { useEffect, useState } from 'react';
import getVendorTable from '../api/getVendorTable';
import VendorTableProps from '../model/type';
import renameStatus from '../utils/renameStatus';

export default function VendorCalculatePage({
  boardCount,
}: {
  boardCount: BoardCountProps;
}) {
  const [vendorTable, setVendorTable] = useState<VendorTableProps[]>([]);
  const [setPaymentStatus, setSetPaymentStatus] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      const res = await getVendorTable(
        String(boardCount.vendorSeq),
        setPaymentStatus,
        '',
        '',
      );
      setVendorTable(res.data);
    };
    fetchData();
  }, [boardCount.vendorSeq, setPaymentStatus]);

  return (
    <div className="flex w-full flex-col gap-7.5 pr-7.5">
      <div className="grid h-[374px] w-full grid-cols-2 gap-7.5">
        <div className="flex flex-col gap-7.5">
          <VendorCalculateBoard boardCount={boardCount} />
          <div className="h-[139px] w-full rounded-md bg-white px-8 py-7.5 shadow-md">
            <h2 className="mb-5 text-lg font-semibold">정산 처리 상태</h2>
            <div className="flex items-center gap-22">
              <span>처리 상태</span>
              <VendorSelect
                onChange={(value) => setSetPaymentStatus(value)}
                options={['전체', '정산 완료', '정산 대기']}
                placeholder="전체"
                triggerClassName="h-[40px] w-[220px] rounded-md bg-vendor-gray font-light items-center flex text-xs"
                itemsClassName="justify-center font-light bg-vendor-gray"
              />
            </div>
          </div>
        </div>
        <VendorPolicy />
      </div>
      <div className="overflow-hidden rounded-md shadow-md">
        <table className="w-full border-separate border-spacing-0 text-center text-[13px]">
          <thead className="bg-vendor-gray [&>tr>th]:border [&>tr>th]:border-gray-200 [&>tr>th]:py-3">
            <tr className="font-semibold">
              <th>정산상태</th>
              <th>솔루션명</th>
              <th>솔루션 가격</th>
              <th>정산일</th>
              <th>정산 금액</th>
              <th>구매 고객</th>
            </tr>
          </thead>
          <tbody className="bg-white [&>tr>td]:border [&>tr>td]:border-gray-200 [&>tr>td]:py-3">
            {vendorTable.length > 0 ? (
              vendorTable.map((item) => (
                <tr key={item.solutionSeq}>
                  <td>{renameStatus(item.paymentStatus)}</td>
                  <td>{item.solutionName}</td>
                  <td>{item.solutionAmount}</td>
                  <td>
                    {new Date(item.settlementDueDate).toLocaleDateString()}
                    <br />
                    <span className="text-vendor-secondary">
                      ({new Date(item.settlementDueDate).toLocaleDateString()}
                      예정)
                    </span>
                  </td>
                  <td>
                    {item.solutionAmount}
                    <br />
                    <span className="text-vendor-secondary">
                      ({new Date(item.settlementAmount).toLocaleDateString()}
                      예정)
                    </span>
                  </td>
                  <td>{item.consumerName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
