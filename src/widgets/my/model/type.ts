export type PaymentInfoProps = {
  consumerSeq: number;
  paymentStatus: 'DONE' | 'SETTLED' | 'NULL';
  paymentCompletedAt: string;
  representImageUrl: string;
  vendorName: string;
  solutionSeq: number;
  solutionName: string;
  method: 'CARD' | 'BANK_TRANSFER' | 'KAKAOPAY';
  amount: number;
  existReview: boolean;
  vendorUniqueType: string;
  vendorSeq: number;
  category: string;
};
