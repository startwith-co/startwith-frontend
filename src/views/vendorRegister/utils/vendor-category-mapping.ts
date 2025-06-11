export default function vendorCategoryMapping(category: string) {
  switch (category) {
    case 'BI(데이터 시각화)':
      return 'BI';
    case 'BPM(업무 자동화)':
      return 'BPM';
    case 'CMS(콘텐츠 관리 시스템)':
      return 'CMS';
    case 'CRM(고객 관계 관리)':
      return 'CRM';
    case 'DMS(문서 관리 시스템)':
      return 'DMS';
    case 'EAM(전사적 콘텐츠 관리)':
      return 'EAM';
    case 'ECM(전사적 콘텐츠 관리)':
      return 'ECM';
    case 'ERP(전사적 자원 관리)':
      return 'ERP';
    case 'HR(성과 및 조직 관리)':
      return 'HR';
    case 'HRM(인사운영 관리)':
      return 'HRM';
    case 'KM(지식 관리)':
      return 'KM';
    case 'SCM(공급망 관리)':
      return 'SCM';
    case 'SI(시스템 통합 및 구축)':
      return 'SI';
    case '보안':
      return 'SECURITY';
    default:
      return 'BI';
  }
}
