'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import editVendorInfoPost from '../api/editVendorInfoPost';

const schema = z.object({
  company: z.string().min(1, '기업명 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  phoneNumber: z.string().min(1, '담당자 연락처 입력해주세요.'),
  accountNumber: z.string().min(1, '계좌번호 입력해주세요.'),
  bankName: z.string().min(1, '은행명 입력해주세요.'),
});

type FormSchema = z.infer<typeof schema>;

function EditVendorInfo() {
  const {
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  return (
    <SignupForm
      action={editVendorInfoPost}
      buttonProps="bg-vendor-gray h-[35px] font-light text-sm"
      buttonName="수정하기"
      buttonWrapperClassName="flex justify-center"
      loadingText="수정 중.."
    >
      <div>
        <label htmlFor="company" className="text-sm">
          기업명(사업자명)<span className="text-red-500">*</span>
          <Input
            id="company"
            type="string"
            {...register('company')}
            name="company"
            className="bg-vendor-gray mt-2 mb-2 h-[40px] indent-2"
          />
        </label>
        {errors.company && (
          <p className="text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="text-sm">
          담당자 연락처(휴대폰)<span className="text-red-500">*</span>
          <Input
            id="phoneNumber"
            type="string"
            {...register('phoneNumber')}
            name="phoneNumber"
            className="bg-vendor-gray mt-2 mb-2 h-[40px] indent-2"
          />
        </label>
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm">
          담당자 이메일<span className="text-red-500">*</span>
          <Input
            id="email"
            type="string"
            {...register('email')}
            name="email"
            className="bg-vendor-gray mt-2 mb-2 h-[40px] indent-2"
          />
        </label>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="accountNumber" className="text-sm">
          사업자 계좌번호<span className="text-red-500">*</span>
          <Input
            id="accountNumber"
            type="string"
            {...register('accountNumber')}
            name="accountNumber"
            className="bg-vendor-gray mt-2 mb-2 h-[40px] indent-2"
          />
        </label>
        {errors.accountNumber && (
          <p className="text-sm text-red-500">{errors.accountNumber.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="bankName" className="text-sm">
          은행명<span className="text-red-500">*</span>
          <Input
            id="bankName"
            type="string"
            {...register('bankName')}
            name="bankName"
            className="bg-vendor-gray mt-2 mb-2 h-[40px] indent-2"
          />
        </label>
        {errors.bankName && (
          <p className="text-sm text-red-500">{errors.bankName.message}</p>
        )}
      </div>
    </SignupForm>
  );
}

export default EditVendorInfo;
