import { z } from 'zod';

const solutionCategoryToValue: Record<string, string> = {
  '마케팅 자동화 · 분석': 'MARKETING_AUTOMATION_ANALYSIS',
  '상품 컨텐츠 자동화': 'PRODUCT_CONTENT_AUTOMATION',
  '쇼핑몰 · 커머스 운영 관리': 'ECOMMERCE_OPERATION_MANAGEMENT',
  '인플루언서 · 크리에이터 협업': 'INFLUENCER_CREATOR_COLLABORATION',
};

const industryCategoryToValue: Record<string, string> = {
  IT: 'it',
  '이커머스(쿠팡, 네이버)': 'ecommerce',
};

const industryCategoryToLabel: Record<string, string> = Object.fromEntries(
  Object.entries(industryCategoryToValue).map(([ko, en]) => [en, ko]),
) as Record<IndustryCategoryValueType, IndustryCategoryLabelType>;

export type SolutionCategoryLabelType = keyof typeof solutionCategoryToValue;
export type SolutionCategoryValueType =
  (typeof solutionCategoryToValue)[SolutionCategoryLabelType];

export type IndustryCategoryLabelType = keyof typeof industryCategoryToValue;
export type IndustryCategoryValueType =
  (typeof industryCategoryToValue)[IndustryCategoryLabelType];

const solutionCategoryLabels: SolutionCategoryLabelType[] = Object.keys(
  solutionCategoryToValue,
);

const industryCategoryLabels: IndustryCategoryLabelType[] = Object.keys(
  industryCategoryToValue,
);

const solutionCategoryLabelEnum = z.enum(
  Object.keys(solutionCategoryToValue) as [
    SolutionCategoryLabelType,
    ...SolutionCategoryLabelType[],
  ],
);

const solutionCategoryToLabel: Record<string, string> = Object.fromEntries(
  Object.entries(solutionCategoryToValue).map(([ko, en]) => [en, ko]),
) as Record<SolutionCategoryValueType, SolutionCategoryLabelType>;

export {
  solutionCategoryToValue,
  solutionCategoryToLabel,
  solutionCategoryLabelEnum,
  solutionCategoryLabels,
  industryCategoryLabels,
  industryCategoryToLabel,
  industryCategoryToValue,
};
