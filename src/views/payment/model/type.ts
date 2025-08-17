export interface PaymentInfoProps {
  paymentEventSeq: number;
  paymentEventName: string;
  category:
    | 'DEFECT_INSPECTION'
    | 'PREDICTIVE_MAINTENANCE'
    | 'PROCESS_MONITORING'
    | 'MES_INVENTORY_MANAGEMENT';
  vendorName: string;
  vendorBannerImageUrl: string;
  representImageUrl: string;
  amount: number;
  tax: number;
  actualAmount: number;
  consumerSeq: number;
  consumerName: string;
  phoneNumber: string;
  email: string;
  vendorSeq: string;
}

export interface PaymentSuccessProps {
  orderId: string;
  orderName: string;
  paymentKey: string;
  method: string;
  totalAmount: number;
  approvedAt: string;
  cardCompany: string;
  cardNumber: string;
  cardType: string;
  receiptUrl: string;
  category:
    | 'DEFECT_INSPECTION'
    | 'PREDICTIVE_MAINTENANCE'
    | 'PROCESS_MONITORING'
    | 'MES_INVENTORY_MANAGEMENT';
}
