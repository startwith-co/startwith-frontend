'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import signupVendorPost from '@/features/signup/api/signupVendorPost';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import useFileUpload from '@/shared/model/useFileUpload';

const passwordRegex = /^(?=.*[!@#])[A-Za-z\d!@#]{8,16}$/;
const schema = z.object({
  company: z.string().min(1, '기업명 입력해주세요.'),
  phoneNumber: z.string().min(1, '전화번호 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  name: z.string().min(1, '담당자 성함 입력해주세요.'),
  password: z
    .string()
    .min(8)
    .max(16)
    .regex(
      passwordRegex,
      '비밀번호는 특수문자(!@#)를 1개 이상 포함해야 합니다.',
    ),
});

type FormSchema = z.infer<typeof schema>;

function SignupVendorForm() {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const {
    file,
    fileInputRef,
    handleFileChange,
    handleClickFileInput,
    preview,
  } = useFileUpload();

  return (
    <SignupForm
      action={(prevState, formData) =>
        signupVendorPost(prevState, formData, file)
      }
      buttonProps="bg-gradient-to-r from-[#2D2D2D] to-[#404040] text-white w-full h-[60px] font-extrabold text-lg shadow-sm mb-8"
      buttonName="솔루션 공급사로 파트너쉽 시작"
      loadingText="신청 중.."
      disabled={!isValid}
    >
      <div className="w-[700px] space-y-4">
        <div className="grid grid-cols-[3fr_1fr] items-center justify-center gap-4">
          <div className="relative w-full">
            <Input
              {...register('company')}
              placeholder="기업명(사업자명)"
              className="h-[55px] w-full bg-white indent-2"
            />
            {errors.company && (
              <p className="absolute bottom-1 left-2 text-sm text-red-500">
                {errors.company.message}
              </p>
            )}
          </div>

          <input
            id="file"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="relative w-full">
            <Button
              type="button"
              asChild={false}
              onClick={handleClickFileInput}
              className="h-[50px] w-full bg-white text-sm text-[#5B76FF] shadow-sm"
            >
              사업자 등록증 첨부하기
            </Button>

            {file && (
              <p className="absolute bottom-0 left-6 mt-1 truncate text-[8px] text-gray-600">
                {file.name}
              </p>
            )}
          </div>
        </div>

        <Input
          {...register('name')}
          placeholder="담당자 성함"
          className="h-[55px] w-full bg-white indent-2"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}

        <Input
          {...register('phoneNumber')}
          placeholder="담당자 연락처(휴대폰)"
          className="h-[55px] w-full bg-white indent-2"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
        <div className="grid grid-cols-[3fr_1fr] items-center justify-center gap-4">
          <Input
            {...register('email')}
            placeholder="담당자 이메일 입력"
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
        <Input
          type="password"
          {...register('password')}
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
    </SignupForm>
  );
}

export default SignupVendorForm;
