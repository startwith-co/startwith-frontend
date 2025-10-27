export default function vendorCategoryMapping(category: string) {
  switch (category) {
    case '마케팅 자동화 · 분석':
      return 'MARKETING_AUTOMATION_ANALYSIS';
    case '상품 컨텐츠 자동화':
      return 'PRODUCT_CONTENT_AUTOMATION';
    case '쇼핑몰 · 커머스 운영 관리':
      return 'ECOMMERCE_OPERATION_MANAGEMENT';
    case '인플루언서 · 크리에이터 협업':
      return 'INFLUENCER_CREATOR_COLLABORATION';
    default:
      return '';
  }
}
