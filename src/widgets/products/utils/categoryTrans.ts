export default function categoryTrans(category: string) {
  switch (category) {
    case 'DEFECT_INSPECTION':
      return ['불량 검출·예측', '(비전 검사)'];
    case 'PREDICTIVE_MAINTENANCE':
      return ['설비 이상 및 고장 예측', '(예지보전)'];
    case 'PROCESS_MONITORING':
      return ['실시간 공정 상태 모니터링', '(공정 이상 감지)'];
    case 'MES_INVENTORY_MANAGEMENT':
      return ['MES 재고관리', '(공정 재고관리)'];
    default:
      return ['불량 검출·예측', '(비전 검사)'];
  }
}
