export interface StatsProps {
  statType: 'SALES_SIZE' | 'EMPLOYEES_SIZE';
  percentage: number;
  label: string;
}
export interface VendorInfoProps {
  vendorSeq: number;
  vendorName: string | null;
  managerName: string | null;
  phoneNumber: string | null;
  email: string | null;
  audit: boolean;
  accountNumber: string | null;
  bank: string | null;
  vendorExplanation: string | null;
  vendorBannerImageUrl: string | null;
  weekdayAvailable: boolean;
  weekdayStartTime: string | null;
  weekdayEndTime: string | null;
  weekendAvailable: boolean;
  weekendStartTime: string | null;
  weekendEndTime: string | null;
  holidayAvailable: boolean;
  holidayStartTime: string | null;
  holidayEndTime: string | null;
  orderCount: number | null;
  clientCount: number | null;
  vendorUniqueType: string;
  stats: StatsProps[];
  clientResponse: ClientResponseProps[];
}

export interface ClientResponseProps {
  clientSeq: number;
  logoImageUrl: string;
}

export interface ConsumerInfoProps {
  consumerSeq: number;
  consumerName: string;
  phoneNumber: string;
  email: string;
  industry: string;
  consumerImageUrl: string;
  consumerUniqueType: string;
}
