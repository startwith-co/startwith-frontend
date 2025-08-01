const categoryToEn: Record<string, string> = {
  '불량 검출 · 예측(비전 검사)': 'DEFECT_INSPECTION',
  '설비 이상 및 고장 예측(예지보전)': 'PREDICTIVE_MAINTENANCE',
  '실시간 공정 상태 모니터링(공정 이상 감지)': 'PROCESS_MONITORING',
  'MES 재고관리(공정 재고관리)': 'MES_INVENTORY_MANAGEMENT',
};

const categoryToKo: Record<string, string> = {
  DEFECT_INSPECTION: '불량 검출 · 예측(비전 검사)',
  PREDICTIVE_MAINTENANCE: '설비 이상 및 고장 예측(예지보전)',
  PROCESS_MONITORING: '실시간 공정 상태 모니터링(공정 이상 감지)',
  MES_INVENTORY_MANAGEMENT: 'MES 재고관리(공정 재고관리)',
};

export { categoryToEn, categoryToKo };
