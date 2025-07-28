export default function vendorCategoryMapping(category: string) {
  switch (category) {
    case '불량 검출·예측(비전 검사)':
      return 'DEFECT_INSPECTION';
    case '설비 이상 및 고장 예측(예지보전)':
      return 'PREDICTIVE_MAINTENANCE';
    case '실시간 공정 상태 모니터링(공정 이상 감지)':
      return 'PROCESS_MONITORING';
    case 'MES 재고관리(공정 재고관리)':
      return 'MES_INVENTORY_MANAGEMENT';
    default:
      return 'DEFECT_INSPECTION';
  }
}
