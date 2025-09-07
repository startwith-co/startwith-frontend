import api from '@/shared/api/index-api';
import { ApiResponse } from '@/shared/model/apiType';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { categoryToKo } from '@/shared/model/categoryMap';
import { CategoryType, SolutionRequest } from './vendorCategotyType';

const valueToLabelMap = Object.entries(categoryToKo).reduce<
  Record<string, string>
>((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {});

function useRequestPaymentDetails() {
  const [solutionDetails, setSolutionDetails] = useState<SolutionRequest[]>([]);

  useEffect(() => {
    const fetchSolutionDetails = async () => {
      try {
        const session = await getSession();
        const vendorSeq = session?.vendorSeq;
        const res = await api
          .get(`api/b2b-service/vendor/solution?vendorSeq=${vendorSeq}`)
          .json<ApiResponse<SolutionRequest[]>>();

        setSolutionDetails(
          res.data.map((solution) => ({
            solutionSeq: solution.solutionSeq,
            solutionName: solution.solutionName,
            serverCategory: solution.category,
            category: valueToLabelMap[solution.category] as CategoryType,
            amount: solution.amount,
          })),
        );
      } catch (error) {
        console.error('벤더가 생성한 솔루션 정보 가져오기 실패:', error);
      }
    };

    fetchSolutionDetails();
  }, []);

  return { solutionDetails };
}

export default useRequestPaymentDetails;
