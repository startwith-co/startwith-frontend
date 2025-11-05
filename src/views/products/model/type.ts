export interface SolutionEffectProps {
  effectName: string;
  percent: number;
  direction: string;
}

export interface VendorCategoryProps {
  solutionSeq: number;
  category: string;
}

export interface SolutionDetailProps {
  solutionSeq: number;
  representImageUrl: string;
  descriptionPdfUrl: string;
  solutionName: string;
  solutionDetail: string;
  amount: number;
  solutionImplementationType: string[];
  duration: number;
  recommendedCompanySize: string[];
  solutionEffect: SolutionEffectProps[];
}
