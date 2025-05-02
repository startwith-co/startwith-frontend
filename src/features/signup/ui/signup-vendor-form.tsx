'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from './signup-form';
import signupVendorPost from '../api/signupVendorPost';

const schema = z.object({
  company: z.string().min(1, '기업명 입력해주세요.'),
  phoneNumber: z.string().min(1, '전화번호 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
});

type FormSchema = z.infer<typeof schema>;

function SignupVendorForm() {
  const {
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  return (
    <SignupForm
      action={signupVendorPost}
      buttonProps="bg-[#5B76FF] text-white"
      buttonName="솔루션 공급사로 파트너쉽 시작"
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
          {...register('phoneNumber')}
          name="phoneNumber"
          placeholder="담당자 전화번호"
          className="h-[55px] w-[600px] bg-white indent-2"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
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
    </SignupForm>
  );
}

export default SignupVendorForm;
