type CategoryType =
  | 'BI'
  | 'BPM'
  | 'CMS'
  | 'CRM'
  | 'DMS'
  | 'EAM'
  | 'ECM'
  | 'ERP'
  | 'HR'
  | 'HRM'
  | 'KM'
  | 'SCM'
  | 'SI'
  | 'SECURITY';

export type CategoryRequest = {
  category: CategoryType;
  solutionSeq: number;
};
