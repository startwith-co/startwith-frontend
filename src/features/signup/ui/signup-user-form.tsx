'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from './signup-form';
import signupUserPost from '../api/signupUserPost';

const schema = z.object({
  company: z.string().min(1, '기업명 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  industry: z.string().min(1, '산업군 입력해주세요.'),
});

type FormSchema = z.infer<typeof schema>;

function SignupUserForm() {
  const {
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange', // 실시간 검사
  });

  return (
    <SignupForm
      action={signupUserPost}
      buttonProps="bg-white text-[#5B76FF]"
      buttonName="기업 고객 등록 신청"
    >
      <div>
        <Input
          type="string"
          {...register('company')}
          name="company"
          placeholder="기업명(사업자명)"
          className="h-[55px] w-[600px] bg-white indent-2"
        />
        {errors.company && (
          <p className="text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>

      <div>
        <Input
          type="string"
          {...register('email')}
          name="email"
          placeholder="담당자 이메일"
          className="h-[55px] w-[600px] bg-white indent-2"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type="string"
          {...register('industry')}
          name="industry"
          placeholder="종사 산업군"
          className="h-[55px] w-[600px] bg-white indent-2"
        />
        {errors.industry && (
          <p className="text-sm text-red-500">{errors.industry.message}</p>
        )}
      </div>
    </SignupForm>
  );
}

export default SignupUserForm;
