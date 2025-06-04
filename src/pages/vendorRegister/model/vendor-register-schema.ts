import { z } from 'zod';

export const vendorRegisterSchema = z.object({
  representImageUrl: z.instanceof(File),
  descriptionPdfUrl: z.instanceof(File),
  vendorSeq: z.number(),
  solutionName: z.string().min(1, '솔루션명 입력해주세요.'),
  solutionDetail: z.string().min(1, '솔루션 설명 입력해주세요.'),
  category: z.enum([
    'BI',
    'BPM',
    'CMS',
    'CRM',
    'DMS',
    'EAM',
    'ECM',
    'ERP',
    'HR',
    'HRM',
    'KM',
    'SCM',
    'SI',
    'SECURITY',
  ]),
  industry: z.string().min(1, '산업 선택해주세요.'),
  recommendedCompanySize: z.array(z.string(), {
    required_error: '기업 규모 선택해주세요.',
  }),
  solutionImplementationType: z.string(),
  specialist: z.string(),
  amount: z.number().min(1, '가격 입력해주세요.'),
  duration: z.number().min(1, '기간 입력해주세요.'),
  solutionEffect: z.array(
    z.object({
      effectName: z.string().min(1, '효과명 입력해주세요.'),
      percent: z.number().min(1, '퍼센트 입력해주세요.'),
      direction: z.enum(['INCREASE', 'DECREASE']),
    }),
  ),
  keyword: z.array(z.string()).min(1, '키워드 입력해주세요.'),
});

export type VendorRegisterSchema = z.infer<typeof vendorRegisterSchema>;
