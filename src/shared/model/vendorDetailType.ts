export interface TimeObject {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface VendorDetailType {
  vendorSeq: number;
  vendorName: string;
  managerName: string;
  phoneNumber: string;
  email: string;
  audit: boolean;
  accountNumber: string;
  bank: string;
  vendorExplanation: string;
  vendorBannerImageUrl: string;
  weekdayAvailable: boolean;
  weekdayStartTime: TimeObject;
  weekdayEndTime: TimeObject;
  weekendAvailable: boolean;
  weekendStartTime: TimeObject;
  weekendEndTime: TimeObject;
  holidayAvailable: boolean;
  holidayStartTime: TimeObject;
  holidayEndTime: TimeObject;
  orderCount: number;
  clientCount: number;
  vendorUniqueType: string;
}
