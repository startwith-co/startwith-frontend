'use client';

import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { solutionCategoryToLabel } from '@/shared/model/getCategoryList';

import { VendorSolutionType } from '../model/vendorSolutionType';
import deleteSolution from '../api/deleteSolution';

export default function VendorUpdateTable({
  res,
}: {
  res: VendorSolutionType[];
}) {
  const handleDelete = async (solutionSeq: string) => {
    const confirmed = window.confirm(
      '정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    );
    if (!confirmed) return;

    await deleteSolution(solutionSeq);
  };

  return (
    <tbody className="bg-white [&>tr>td]:border [&>tr>td]:border-gray-200 [&>tr>td]:py-3">
      {res.length > 0 ? (
        res.map((item) => (
          <tr key={item.solutionSeq}>
            <td>{item.solutionName}</td>
            <td>{solutionCategoryToLabel[item.category]}</td>
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
  );
}
