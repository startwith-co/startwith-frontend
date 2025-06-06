import z from 'zod';

export const vendorUpdateSchema = z.object({
  vendorBannerImageUrl: z.instanceof(File),
  vendorSeq: z.number(),
  vendorName: z.string(),
  managerName: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  audit: z.boolean(),
  accountNumber: z.string(),
  bank: z.string(),
  vendorExplanation: z.string(),
  weekdayAvailable: z.boolean(),
  weekdayStartTime: z.object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
    nano: z.number(),
  }),
  weekdayEndTime: z.object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
    nano: z.number(),
  }),
  weekendAvailable: z.boolean(),
  weekendStartTime: z.object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
    nano: z.number(),
  }),
  weekendEndTime: z.object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
    nano: z.number(),
  }),
  holidayAvailable: z.boolean(),
  holidayStartTime: z.object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
    nano: z.number(),
  }),
  holidayEndTime: z.object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
    nano: z.number(),
  }),
  orderCount: z.number(),
  clientCount: z.number(),
});

export type VendorUpdateSchema = z.infer<typeof vendorUpdateSchema>;
