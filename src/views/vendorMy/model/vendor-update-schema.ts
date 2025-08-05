import z from 'zod';

export const vendorUpdateSchema = z.object({
  vendorBannerImageUrl: z.instanceof(File),
  clientInfos: z.array(z.instanceof(File)),
  vendorSeq: z.number(),
  vendorName: z.string().min(1, '업체명 입력해주세요.'),
  managerName: z.string().min(1, '담당자 성함 입력해주세요.'),
  phoneNumber: z.string().min(1, '전화번호를 입력해주세요.'),
  email: z.string().email('이메일을 입력해주세요.'),
  audit: z.boolean(),
  accountNumber: z.string().min(1, '은행 계좌번호를 입력해주세요.'),
  bank: z.string().min(1, '은행명을 입력해주세요.'),
  vendorExplanation: z.string(),
  weekdayAvailable: z.boolean(),
  weekdayStartTime: z.string().min(1, '시간을 입력해주세요.'),
  weekdayEndTime: z.string().min(1, '시간을 입력해주세요.'),
  weekendAvailable: z.boolean(),
  weekendStartTime: z.string().min(1, '시간을 입력해주세요.'),
  weekendEndTime: z.string().min(1, '시간을 입력해주세요.'),
  holidayAvailable: z.boolean(),
  holidayStartTime: z.string().min(1, '시간을 입력해주세요.'),
  holidayEndTime: z.string().min(1, '시간을 입력해주세요.'),
  orderCount: z.number(),
  clientCount: z.number(),
  stats: z.array(
    z.object({
      label: z.string(),
      percentage: z.number(),
      statType: z.enum(['SALES_SIZE', 'EMPLOYEES_SIZE']),
    }),
  ),
});

export type VendorUpdateSchema = z.infer<typeof vendorUpdateSchema>;
