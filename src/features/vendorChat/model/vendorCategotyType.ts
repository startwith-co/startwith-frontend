export type CategoryType =
  | 'DEFECT_INSPECTION'
  | 'PREDICTIVE_MAINTENANCE'
  | 'PROCESS_MONITORING'
  | 'MES_INVENTORY_MANAGEMENT';

export type SolutionRequest = {
  solutionSeq: number;
  solutionName: string;
  category: CategoryType;
  amount: number;
  serverCategory: CategoryType;
};
