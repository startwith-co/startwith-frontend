'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import editInfoPost from '@/features/my/api/editInfoPost';

const schema = z.object({
  company: z.string().min(1, '기업명 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  industry: z.string().min(1, '산업군 입력해주세요.'),
  phoneNumber: z.string().min(1, '담당자 연락처 입력해주세요.'),
});

type FormSchema = z.infer<typeof schema>;

function EditInfo() {
  const {
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  return (
    <SignupForm
      action={editInfoPost}
      buttonProps="bg-black text-white w-[180px] h-[35px] font-light text-sm"
      buttonName="수정하기"
      buttonWrapperClassName="flex justify-center"
      loadingText="수정 중.."
    >
      <div>
        <label htmlFor="company" className="text-sm text-[#A7A7A7]">
          기업명(사업자명)
          <Input
            id="company"
            type="string"
            {...register('company')}
            name="company"
            className="mt-2 mb-2 h-[40px] w-[600px] border-0 bg-[#F9F9F9] indent-2"
          />
        </label>
        {errors.company && (
          <p className="text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="text-sm text-[#A7A7A7]">
          담당자 연락처
          <Input
            id="phoneNumber"
            type="string"
            {...register('phoneNumber')}
            name="phoneNumber"
            className="mt-2 mb-2 h-[40px] w-[600px] border-0 bg-[#F9F9F9] indent-2"
          />
        </label>
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm text-[#A7A7A7]">
          담당자 이메일
          <Input
            id="email"
            type="string"
            {...register('email')}
            name="email"
            className="mt-2 mb-2 h-[40px] w-[600px] border-0 bg-[#F9F9F9] indent-2"
          />
        </label>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="industry" className="text-sm text-[#A7A7A7]">
          종사 산업군
          <Input
            id="industry"
            type="string"
            {...register('industry')}
            name="industry"
            className="mt-2 mb-2 h-[40px] w-[600px] border-0 bg-[#F9F9F9] indent-2"
          />
        </label>
        {errors.industry && (
          <p className="text-sm text-red-500">{errors.industry.message}</p>
        )}
      </div>
    </SignupForm>
  );
}

export default EditInfo;
