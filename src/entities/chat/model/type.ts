export default interface PaymentRequestProps {
  paymentEventSeq: number;
  paymentEventName: string;
  category: string;
  amount: number;
  contractConfirmationUrl: string;
  refundPolicyUrl: string;
  createdAt: string;
  orderId: string | null;
}

export interface FileRequestProps {
  fileUrl: string;
}

export interface PaymentConflictProps {
  data: boolean;
}
