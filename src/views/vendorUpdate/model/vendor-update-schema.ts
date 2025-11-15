import { solutionCategoryLabelEnum } from '@/shared/model/getCategoryList';
import { z } from 'zod';

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
    .union([solutionCategoryLabelEnum, z.literal('')])
    .refine((value) => value !== '', {
      message: '카테고리를 선택해주세요.',
    }),
  recommendedCompanySize: z.array(z.string()).min(1, '기업 규모 선택해주세요.'),
  solutionImplementationType: z
    .array(z.string())
    .min(1, '솔루션 구축 형태 선택해주세요.'),
  amount: z.preprocess(
    (value) => (value === '' ? 0 : Number(value)),
    z
      .number({
        required_error: '가격을 입력해주세요.',
        invalid_type_error: '숫자를 입력해주세요.',
      })
      .min(1, '최소 1원 이상의 가격을 입력해주세요.')
      .max(10000000, '최대 1000만원까지 입력 가능합니다.'),
  ),
  duration: z
    .string()
    .min(1, '최소 1일 이상의 기간을 입력해주세요.')
    .refine(
      (value) => Number(value) > 0,
      '최소 1일 이상의 기간을 입력해주세요.',
    )
    .refine(
      (value) => Number(value) <= 42,
      '개발 기한은 42일 이하로 입력해주세요.',
    ),
  solutionEffect: z
    .array(
      z.object({
        effectName: z.string().min(1, '효과명 입력해주세요.'),
        percent: z.number().min(1, '퍼센트 입력해주세요.'),
        direction: z.enum(['INCREASE', 'DECREASE']),
      }),
    )
    .optional(),
  keyword: z.array(z.string()).min(1, '키워드 입력해주세요.'),
});

export type VendorRegisterSchema = z.infer<typeof vendorRegisterSchema>;
