export default function categoryTrans(category: string) {
  switch (category) {
    case 'MARKETING_AUTOMATION_ANALYSIS':
      return ['마케팅 자동화 · 분석', ''];
    case 'PRODUCT_CONTENT_AUTOMATION':
      return ['상품 컨텐츠 자동화', ''];
    case 'ECOMMERCE_OPERATION_MANAGEMENT':
      return ['쇼핑몰 · 커머스 운영 관리', ''];
    case 'INFLUENCER_CREATOR_COLLABORATION':
      return ['인플루언서 · 크리에이터 협업'];
    default:
      return ['카테고리 선택해주세요.', ''];
  }
}
