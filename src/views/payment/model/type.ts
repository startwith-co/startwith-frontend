export interface PaymentInfoProps {
  paymentEventSeq: number;
  paymentEventName: string;
  category:
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
}
