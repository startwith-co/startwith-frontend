import { Timestamp } from 'firebase/firestore';

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

export interface ChatJsonType {
  type: string;
  solutionName: string;
  solutionPrice: string;
  solutionCategory: string;
}

export interface ChatType {
  id: string;
  createdAt: Timestamp;
  messageId: string;
  messageName: string | ChatJsonType;
  message: string;
  file: boolean;
}

export interface FileRequestProps {
  fileUrl: string;
}

export interface PaymentConflictProps {
  data: boolean;
}
