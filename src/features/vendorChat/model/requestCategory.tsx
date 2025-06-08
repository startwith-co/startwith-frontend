import api from '@/shared/api/index-api';
import { ApiResponse } from '@/shared/model/apiType';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { useEffect, useState } from 'react';
import { CategoryRequest } from './vendorCategotyType';

const solutionCategory = [
  { label: 'BI(데이터 시각화)', value: 'BI' },
  { label: 'BPM(업무 프로세스 관리)', value: 'BPM' },
  { label: 'CMS(콘텐츠 관리 시스템)', value: 'CMS' },
  { label: 'CRM(고객 관계 관리)', value: 'CRM' },
  { label: 'DMS(문서 관리 시스템)', value: 'DMS' },
  { label: 'EAM(전사적 자산 관리)', value: 'EAM' },
  { label: 'ECM(전사 콘텐츠 관리)', value: 'ECM' },
  { label: 'ERP(전사적 자원 관리)', value: 'ERP' },
  { label: 'HR(성과 및 조직 관리)', value: 'HR' },
  { label: 'HRM(인사운영 관리)', value: 'HRM' },
  { label: 'KM(지식 관리)', value: 'KM' },
  { label: 'SCM(공급망 관리)', value: 'SCM' },
  { label: 'SI(시스템 통합 및 구축)', value: 'SI' },
  { label: '보안', value: 'SECURITY' },
];

const valueToLabelMap = solutionCategory.reduce<Record<string, string>>(
  (acc, curr) => {
    acc[curr.value] = curr.label;
    return acc;
  },
  {},
);

type SolutionCategoryOption = {
  label: string;
  value: string;
};

function useRequestCategory() {
  const [solutionCategoryOptions, setSolutionCategoryOptions] = useState<
    SolutionCategoryOption[]
  >([]);

  const { vendorSeq } = useChatMeta();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
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
  }, [vendorSeq]);

  return solutionCategoryOptions;
}

export default useRequestCategory;
