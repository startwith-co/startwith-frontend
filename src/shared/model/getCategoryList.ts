const categoryToValue: Record<string, string> = {
  '마케팅 자동화 · 분석': 'MARKETING_AUTOMATION_ANALYSIS',
  '상품 컨텐츠 자동화': 'PRODUCT_CONTENT_AUTOMATION',
  '쇼핑몰 · 커머스 운영 관리': 'ECOMMERCE_OPERATION_MANAGEMENT',
  '인플루언서 · 크리에이터 협업': 'INFLUENCER_CREATOR_COLLABORATION',
};

const categoryToLabel: Record<string, string> = Object.fromEntries(
  Object.entries(categoryToValue).map(([ko, en]) => [en, ko]),
);

export { categoryToValue, categoryToLabel };
