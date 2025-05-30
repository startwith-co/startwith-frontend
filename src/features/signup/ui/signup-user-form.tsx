'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import signupUserPost from '@/features/signup/api/signupUserPost';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import SignupIndustryModal from './signup-industry-modal';

const passwordRegex = /^(?=.*[!@#])[A-Za-z\d!@#]{8,16}$/;

const schema = z.object({
  company: z.string().min(1, '기업명 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 최대 16자까지 가능합니다.')
    .regex(
      passwordRegex,
      '비밀번호는 특수문자(!@#)를 1개 이상 포함해야 합니다.',
    ),
});

type FormSchema = z.infer<typeof schema>;

function SignupUserForm() {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const [open, setOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  return (
    <SignupForm
      action={(prevState, formData) =>
        signupUserPost(prevState, formData, selectedIndustry)
      }
      variant="textBlue"
      buttonProps=" w-full h-[60px] font-extrabold text-lg shadow-sm mb-8"
      buttonName="기업 고객으로 편리한 솔루션 탐색 시작"
      loadingText="신청 중.."
      formProps="w-[700px] space-y-6"
      disabled={!isValid}
    >
      <div>
        <Input
          type="string"
          {...register('company')}
          name="company"
          placeholder="기업명(사업자명)"
          className="h-[55px] w-full bg-white indent-2"
        />
        {errors.company && (
          <p className="text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>

      <div className="grid grid-cols-[3fr_1fr] items-center justify-center gap-4">
        <Input
          {...register('email')}
          placeholder="이메일 입력"
          className="h-[55px] w-full bg-white indent-2"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <Button
          type="button"
          asChild={false}
          onClick={() => {}}
          className="h-[55px] w-full bg-white text-sm text-[#7A7A7A] shadow-sm"
        >
          이메일 인증코드 전송
        </Button>
      </div>
      <div className="grid grid-cols-[3fr_1fr] items-center justify-center gap-4">
        <Input
          placeholder="인증코드 입력"
          className="h-[55px] w-full bg-white indent-2"
        />
        <Button
          type="button"
          asChild={false}
          onClick={() => {}}
          className="h-[55px] w-full bg-white text-sm text-[#7A7A7A] shadow-sm"
        >
          인증코드 인증하기
        </Button>
      </div>
      <div>
        <Input
          type="password"
          {...register('password')}
          name="password"
          placeholder="비밀번호 입력 *8~16자리 입력, 특수기호(!@#) 1개 포함"
          className="h-[55px] w-full bg-white indent-2"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="grid grid-cols-[3fr_1fr] items-center justify-center gap-4">
        <Input
          placeholder="비밀번호 확인"
          className="h-[55px] w-full bg-white indent-2"
        />

        <Button
          type="button"
          asChild={false}
          onClick={() => {}}
          className="h-[55px] w-full bg-white text-sm text-[#7A7A7A] shadow-sm"
        >
          비밀번호 확인하기
        </Button>
      </div>

      <div>
        <Button
          type="button"
          asChild={false}
          className="h-[55px] w-full justify-start bg-white text-[#7A7A7A]"
          onClick={() => setOpen(true)}
        >
          {selectedIndustry || '종사 산업군 선택'}
        </Button>
        <SignupIndustryModal
          open={open}
          setOpen={setOpen}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
        />
      </div>
    </SignupForm>
  );
}

export default SignupUserForm;
