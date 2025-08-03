export interface UpdateSolutionProps {
  solutionSeq: number;
  representImageUrl: string;
  descriptionPdfUrl: string;
  solutionName: string;
  solutionDetail: string;
  amount: string;
  solutionImplementationType: ['클라우드', '온프레미스'];
  duration: number;
  industry: ['범용', '금형/정밀가공 제조'];
  recommendedCompanySize: ['중소상공인', '스타트업'];
  solutionEffect: [
    {
      effectName: string;
      percent: number;
      direction: 'INCREASE' | 'DECREASE';
    },
  ];
}
