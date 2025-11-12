'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import signupVendorPost from '@/features/signup/api/signupVendorPost';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import useFileUpload from '@/shared/model/useFileUpload';
import { useState } from 'react';
import CustomForm from '@/shared/ui/custom-form';
import ValidatedInput from '@/shared/ui/validated-input';
import useSendEmail from '../model/useSendEmail';
import useVerifyEmail from '../model/useVerifyEmail';

const passwordRegex = /^(?=.*[!@#])[A-Za-z\d!@#]{8,16}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = z.object({
  company: z.string().min(1, '기업명 입력해주세요.'),
  phoneNumber: z.string().min(1, '전화번호 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  name: z.string().min(1, '담당자 성함 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.')
    .regex(
      passwordRegex,
      '비밀번호는 특수문자(!@#)를 1개 이상 포함해야 합니다.',
    ),
  confirmPassword: z.string(),
  code: z.string(),
});

type FormSchema = z.infer<typeof schema>;

function SignupVendorForm() {
  const {
    register,
    setError,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const { file, fileInputRef, handleFileChange, handleClickFileInput } =
    useFileUpload();
  const [matchSuccess, setMatchSuccess] = useState(false);
  const [hasTriedConfirm, setHasTriedConfirm] = useState(false);

  const { timer, isCounting, handleSendEmail } = useSendEmail();
  const { emailVerified, verifyEmail } = useVerifyEmail(
    watch('email'),
    watch('code'),
    'vendor',
  );

  const handleConfirmClick = () => {
    setHasTriedConfirm(true);
    const { password, confirmPassword } = getValues();
    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: '비밀번호를 다시 확인해주세요.',
      });
      setValue('confirmPassword', '');
      setMatchSuccess(false);
    } else {
      setMatchSuccess(true);
    }
  };

  return (
    <CustomForm
      onSubmit={(formData) => signupVendorPost(formData, file)}
      button={
        <Button
          type="submit"
          asChild={false}
          className="mb-8 h-[60px] w-full text-lg font-extrabold shadow-sm"
          variant="textBlue"
          disabled={!isValid || !matchSuccess || !emailVerified || !file}
        >
          솔루션 공급사로 파트너쉽 시작
        </Button>
      }
      className="w-[700px] space-y-6"
    >
      <ValidatedInput
        input={
          <div className="relative w-full">
            <Input
              {...register('company')}
              placeholder="기업명(사업자명)"
              className="h-[55px] w-full bg-white indent-2"
            />
          </div>
        }
        errorMessage={errors.company?.message}
        button={
          <>
            <input
              id="file"
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              asChild={false}
              variant="textBlue"
              onClick={handleClickFileInput}
              className="h-[55px] w-full text-sm text-[#5B76FF] shadow-sm"
            >
              {file ? (
                <p className="truncate text-center text-xs text-gray-600">
                  {file.name}
                </p>
              ) : (
                '사업자 등록증 첨부하기'
              )}
            </Button>
          </>
        }
      />

      <ValidatedInput
        input={
          <Input
            {...register('name')}
            placeholder="담당자 성함"
            className="mt-5 mb-0 h-[55px] w-full bg-white indent-2"
          />
        }
        errorMessage={errors.name?.message}
      />

      <ValidatedInput
        input={
          <Input
            {...register('phoneNumber', {
              setValueAs: (v) => {
                if (!v) return '';
                const digits = String(v).replace(/\D/g, '');
                if (digits.length < 4) return digits;
                if (digits.length < 7)
                  return `${digits.slice(0, 3)}-${digits.slice(3)}`;
                if (digits.length < 11)
                  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
                return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
              },
            })}
            placeholder="담당자 연락처(휴대폰)"
            className="mt-5 mb-0 h-[55px] w-full bg-white indent-2"
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, '');
              if (digits.length < 4) e.target.value = digits;
              else if (digits.length < 7)
                e.target.value = `${digits.slice(0, 3)}-${digits.slice(3)}`;
              else if (digits.length < 11)
                e.target.value = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
              else
                e.target.value = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
            }}
          />
        }
        errorMessage={errors.phoneNumber?.message}
      />

      <ValidatedInput
        input={
          <Input
            {...register('email')}
            placeholder="담당자 이메일 입력"
            className="h-[55px] w-full bg-white indent-2"
          />
        }
        button={
          <Button
            type="button"
            disabled={!emailRegex.test(watch('email'))}
            asChild={false}
            variant="textBlue"
            onClick={() => handleSendEmail(watch('email'), 'vendor')}
            className="h-[55px] w-full text-sm text-[#7A7A7A] shadow-sm"
          >
            {isCounting
              ? `전송 완료 (${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')})`
              : '이메일 인증코드 전송'}
          </Button>
        }
        errorMessage={errors.email?.message}
        message={isCounting ? '인증코드 전송 완료' : ''}
      />
      <div className="h-[60px]">
        <div
          className={`grid grid-cols-[3fr_1fr] items-center justify-center gap-4 transition-all duration-500 ${
            isCounting ? 'opacity-100' : 'pointer-events-none opacity-50'
          }`}
        >
          <Input
            placeholder="인증코드 입력"
            className="h-[55px] w-full bg-white indent-2"
            {...register('code')}
          />
          <Button
            type="button"
            asChild={false}
            variant="textBlue"
            onClick={verifyEmail}
            disabled={emailVerified}
            className="h-[55px] w-full text-sm text-[#7A7A7A] shadow-sm"
          >
            인증코드 인증하기
          </Button>
        </div>
      </div>
      <ValidatedInput
        input={
          <Input
            type="password"
            {...register('password')}
            placeholder="비밀번호 입력 *8~16자리 입력, 특수기호(!@#) 1개 포함"
            className="mt-5 mb-0 h-[55px] w-full bg-white indent-2"
          />
        }
        errorMessage={errors.password?.message}
      />

      <ValidatedInput
        input={
          <Input
            placeholder="비밀번호 확인"
            className="h-[55px] w-full bg-white indent-2"
            type="password"
            {...register('confirmPassword')}
          />
        }
        errorMessage={errors.confirmPassword?.message}
        button={
          <Button
            type="button"
            asChild={false}
            disabled={
              !passwordRegex.test(watch('password')) ||
              watch('confirmPassword').length < 8
            }
            variant="textBlue"
            onClick={handleConfirmClick}
            className="h-[55px] w-full text-sm text-[#7A7A7A] shadow-sm"
          >
            비밀번호 확인하기
            {matchSuccess && (
              <CheckCircle className="ml-1 h-5 w-5 text-green-500" />
            )}
          </Button>
        }
      />
    </CustomForm>
  );
}

export default SignupVendorForm;
