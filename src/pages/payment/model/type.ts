export default interface PaymentInfoProps {
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
