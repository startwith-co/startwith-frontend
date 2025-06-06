export interface SolutionEffectProps {
  effectName: string;
  percent: number;
  direction: string;
}

export interface SolutionDetailProps {
  solutionSeq: number;
  representImageUrl: string;
  solutionName: string;
  solutionDetail: string;
  amount: number;
  solutionImplementationType: string[];
  duration: number;
  industry: string[];
  recommendedCompanySize: string[];
  solutionEffect: SolutionEffectProps[];
}
