interface VendorTimeProps {
  hour: number;
  minute: number;
  second: number;
  nano: number;
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
  weekdayStartTime: VendorTimeProps | null;
  weekdayEndTime: VendorTimeProps | null;
  weekendAvailable: boolean;
  weekendStartTime: VendorTimeProps | null;
  weekendEndTime: VendorTimeProps | null;
  holidayAvailable: boolean;
  holidayStartTime: VendorTimeProps | null;
  holidayEndTime: VendorTimeProps | null;
  orderCount: number | null;
  clientCount: number | null;
  vendorUniqueType: string;
}
