import api from '@/shared/api/index-api';
import { ApiResponse } from '@/shared/model/apiType';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { categoryToKo } from '@/shared/model/categoryMap';
import { CategoryRequest } from './vendorCategotyType';

const valueToLabelMap = Object.entries(categoryToKo).reduce<
  Record<string, string>
>((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {});

type SolutionCategoryOption = {
  label: string;
  value: string;
};

function useRequestCategory() {
  const [solutionCategoryOptions, setSolutionCategoryOptions] = useState<
    SolutionCategoryOption[]
  >([]);

  console.log('solutionCategoryOptions', solutionCategoryOptions);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const session = await getSession();
        const vendorSeq = session?.vendorSeq;
        const res = await api
          .get(`api/b2b-service/vendor/category?vendorSeq=${vendorSeq}`)
          .json<ApiResponse<CategoryRequest[]>>();

        setSolutionCategoryOptions(
          res.data.map((category: { category: string }) => ({
            label: valueToLabelMap[category.category],
            value: category.category,
          })),
        );
      } catch (error) {
        console.error('카테고리 가져오기 실패:', error);
      }
    };

    fetchCategories();
  }, []);

  return solutionCategoryOptions;
}

export default useRequestCategory;
