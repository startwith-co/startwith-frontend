import { z } from 'zod';

const categoryEnum = z.enum([
  'BI(데이터 시각화)',
  'BPM(업무 자동화)',
  'CSM(콘텐츠 관리 시스템)',
  'CRM(고객 관계 관리)',
  'DMS(문서 관리 시스템)',
  'EAM(전사적 콘텐츠 관리)',
  'ERP(전사적 자원 관리)',
  'HR(성과 및 조직 관리)',
  'HRM(인사운영 관리)',
  'KM(지식 관리)',
  'SCM(공급망 관리)',
  'SI(시스템 통합 및 구축)',
  '보안',
]);

export const vendorRegisterSchema = z.object({
  representImageUrl: z
    .instanceof(File)
    .refine((value) => value.size > 0, '대표 이미지를 업로드해주세요.'),
  descriptionPdfUrl: z
    .instanceof(File)
    .refine((value) => value.size > 0, '설명서를 업로드해주세요.'),
  vendorSeq: z.number(),
  solutionName: z.string().min(1, '솔루션명 입력해주세요.'),
  solutionDetail: z.string().min(1, '솔루션 설명 입력해주세요.'),
  category: z
    .union([categoryEnum, z.literal('')])
    .refine((value) => value !== '', {
      message: '카테고리를 선택해주세요.',
    }),
  industry: z.string().min(1, '산업 선택해주세요.'),
  recommendedCompanySize: z.array(z.string()).min(1, '기업 규모 선택해주세요.'),
  solutionImplementationType: z.string(),
  specialist: z.string(),
  amount: z.string().min(1, '최소 1원 이상의 가격을 입력해주세요.'),
  duration: z.string().min(1, '최소 1일 이상의 기간을 입력해주세요.'),
  solutionEffect: z
    .array(
      z.object({
        effectName: z.string().min(1, '효과명 입력해주세요.'),
        percent: z.number().min(1, '퍼센트 입력해주세요.'),
        direction: z.enum(['INCREASE', 'DECREASE']),
      }),
    )
    .min(1, '도입 성과를 추가해주세요.'),
  keyword: z.array(z.string()).min(1, '키워드 입력해주세요.'),
});

export type VendorRegisterSchema = z.infer<typeof vendorRegisterSchema>;
