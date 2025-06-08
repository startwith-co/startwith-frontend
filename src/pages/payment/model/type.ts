export default interface PaymentInfoProps {
  paymentEventSeq: number;
  paymentEventName: string;
  category: string;
  amount: number;
  contractConfirmationUrl: string;
  refundPolicyUrl: string;
  createdAt: string;
}
