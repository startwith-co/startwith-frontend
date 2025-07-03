export default interface VendorTableProps {
  vendorSeq: 0;
  paymentStatus:
    | 'IN_PROGRESS'
    | 'DONE'
    | 'FAILED'
    | 'CANCELLED'
    | 'WAITING_FOR_DEPOSIT'
    | 'SETTLED';
  solutionSeq: 0;
  solutionName: string;
  solutionAmount: number;
  settlementDueDate: string;
  settlementAmount: string;
  consumerSeq: number;
  consumerName: string;
}
