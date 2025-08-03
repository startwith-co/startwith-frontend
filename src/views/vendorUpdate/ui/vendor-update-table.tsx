'use client';

import useCurrentSession from '@/shared/model/useCurrentSession';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { categoryToKo } from '@/shared/model/categoryMap';
import getVendorSolutions from '../api/getVendorSolutions';
import { VendorSolutionType } from '../model/vendorSolutionType';
import deleteSolution from '../api/deleteSolution';

export default function VendorUpdateTable() {
  const { session } = useCurrentSession();
  const [vendorTable, setVendorTable] = useState<VendorSolutionType[]>([]);
  useEffect(() => {
    if (!session?.vendorSeq) return;
    const fetchData = async () => {
      const res = await getVendorSolutions(String(session.vendorSeq));
      setVendorTable(res);
    };
    fetchData();
  }, [session?.vendorSeq]);

  const handleDelete = async (solutionSeq: string) => {
    const confirmed = window.confirm(
      '정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    );
    if (!confirmed) return;

    await deleteSolution(solutionSeq);
    if (!session?.vendorSeq) return;
    const res = await getVendorSolutions(String(session.vendorSeq));
    setVendorTable(res);
  };

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
        <tbody className="bg-white [&>tr>td]:border [&>tr>td]:border-gray-200 [&>tr>td]:py-3">
          {vendorTable.length > 0 ? (
            vendorTable.map((item) => (
              <tr key={item.solutionSeq}>
                <td>{item.solutionName}</td>
                <td>{categoryToKo[item.category]}</td>
                <td>{item.amount}</td>
                <td>
                  <Link
                    href={`/vendor/update/${item.solutionSeq}?category=${item.category}`}
                  >
                    <Button asChild={false}>수정하기</Button>
                  </Link>
                </td>
                <td>
                  <Button
                    asChild={false}
                    onClick={() => handleDelete(String(item.solutionSeq))}
                    className="border-2 border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    삭제하기
                  </Button>
                </td>
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
  );
}
