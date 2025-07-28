import { z } from 'zod';

const categoryEnum = z.enum([
  '범용',
  '금속/기계/자동차 부품 제조',
  '금형/정밀가공 제조',
  '식음료/식품/포장 제조',
  '전자·전기·배터리 제조',
]);

export const vendorRegisterSchema = z.object({
  representImageUrl: z
    .instanceof(File)
    .refine((value) => value.size > 0, '대표 이미지를 업로드해주세요.'),
  descriptionPdfUrl: z
    .instanceof(File)
    .refine((value) => value.size > 0, '설명서를 업로드해주세요.'),
  vendorSeq: z.number(),
  solutionName: z
    .string()
    .min(1, '솔루션명 입력해주세요.')
    .max(100, '최대 100자까지 입력 가능합니다.'),
  solutionDetail: z
    .string()
    .min(1, '솔루션 설명 입력해주세요.')
    .max(300, '최대 300자까지 입력 가능합니다.'),
  category: z
    .union([categoryEnum, z.literal('')])
    .refine((value) => value !== '', {
      message: '카테고리를 선택해주세요.',
    }),
  industry: z.string().min(1, '산업 선택해주세요.'),
  recommendedCompanySize: z.array(z.string()).min(1, '기업 규모 선택해주세요.'),
  solutionImplementationType: z
    .enum(['클라우드', '온프레미스', ''])
    .refine((value) => value !== '', {
      message: '솔루션 구축 형태 선택해주세요.',
    }),
  specialist: z.string(),
  amount: z
    .string()
    .min(1, '최소 1원 이상의 가격을 입력해주세요.')
    .refine(
      (value) => Number(value) > 0,
      '최소 1원 이상의 가격을 입력해주세요.',
    ),
  duration: z
    .string()
    .min(1, '최소 1일 이상의 기간을 입력해주세요.')
    .refine(
      (value) => Number(value) > 0,
      '최소 1일 이상의 기간을 입력해주세요.',
    ),
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
