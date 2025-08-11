'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import signupUserPost from '@/features/signup/api/signupUserPost';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import ErrorMessage from '@/shared/ui/error-message';
import SignupIndustryModal from './signup-industry-modal';
import useSendEmail from '../model/useSendEmail';
import useVerifyEmail from '../model/useVerifyEmail';

const passwordRegex = /^(?=.*[!@#])[A-Za-z\d!@#]{8,16}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  confirmPassword: z.string(),
  phoneNumber: z.string().min(1, '전화번호 입력해주세요.'),
  code: z.string(),
});

type FormSchema = z.infer<typeof schema>;

function SignupUserForm() {
  const {
    register,
    setError,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const [matchSuccess, setMatchSuccess] = useState(false);
  const [hasTriedConfirm, setHasTriedConfirm] = useState(false);

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

  const [open, setOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const { timer, isCounting, handleSendEmail } = useSendEmail();
  const email = watch('email');
  const code = watch('code');

  const { emailVerified, verifyEmail } = useVerifyEmail(email, code, 'user');

  const isEmailValid = emailRegex.test(email);

  const passValid = watch('password');
  const isPassValid = passwordRegex.test(passValid);

  const confirmValid = watch('confirmPassword');

  return (
    <SignupForm
      action={(prevState, formData) =>
        signupUserPost(prevState, formData, selectedIndustry?.value)
      }
      variant="textBlue"
      buttonProps=" w-full h-[60px] font-extrabold text-lg shadow-sm mb-8"
      buttonName="기업 고객으로 편리한 솔루션 탐색 시작"
      loadingText="신청 중.."
      formProps="w-[700px] space-y-6"
      disabled={!isValid || !matchSuccess || !emailVerified}
    >
      <div>
        <Input
          type="string"
          {...register('company')}
          name="company"
          placeholder="기업명(사업자명)"
          className="h-[55px] w-full bg-white indent-2"
        />
        {errors.company && <ErrorMessage message={errors.company.message} />}
      </div>

      <div>
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
          placeholder="담당자 연락처"
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
        {errors.phoneNumber && (
          <ErrorMessage message={errors.phoneNumber.message} />
        )}
      </div>

      <div className="mb-0 grid grid-cols-[3fr_1fr] items-center justify-center gap-4">
        <Input
          {...register('email')}
          placeholder="이메일 입력"
          className="h-[55px] w-full bg-white indent-2"
        />

        <Button
          type="button"
          asChild={false}
          disabled={isCounting || !isEmailValid}
          variant="textBlue"
          onClick={() => handleSendEmail(email, 'user')}
          className="h-[55px] w-full text-sm text-[#7A7A7A] shadow-sm"
        >
          {isCounting
            ? `전송 완료 (${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')})`
            : '이메일 인증코드 전송'}
        </Button>
      </div>
      {errors.email && <ErrorMessage message={errors.email.message} />}
      {isCounting && (
        <div className="mt-5 grid grid-cols-[3fr_1fr] items-center justify-center gap-4">
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
            className="h-[55px] w-full bg-white text-sm text-[#7A7A7A] shadow-sm"
          >
            인증코드 인증하기
          </Button>
        </div>
      )}

      <div className="mt-5">
        <Input
          type="password"
          {...register('password')}
          name="password"
          placeholder="비밀번호 입력 *8~16자리 입력, 특수기호(!@#) 1개 포함"
          className="h-[55px] w-full bg-white indent-2"
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>
      <div className="mb-0 grid grid-cols-[3fr_1fr] items-center justify-center gap-4">
        <Input
          placeholder="비밀번호 확인"
          className="h-[55px] w-full bg-white indent-2"
          type="password"
          {...register('confirmPassword')}
        />

        <Button
          type="button"
          variant="textBlue"
          asChild={false}
          disabled={!isPassValid || confirmValid.length < 8}
          onClick={handleConfirmClick}
          className="h-[55px] w-full text-sm text-[#7A7A7A] shadow-sm"
        >
          비밀번호 확인하기
          {matchSuccess && <CheckCircle className="h-5 w-5 text-green-500" />}
        </Button>
      </div>
      {hasTriedConfirm && !matchSuccess && (
        <ErrorMessage message="비밀번호를 다시 확인해주세요." />
      )}
      <div className="mt-5">
        <Button
          type="button"
          variant="textBlue"
          asChild={false}
          className="h-[55px] w-full justify-start bg-white text-[#7A7A7A]"
          onClick={() => setOpen(true)}
        >
          {selectedIndustry?.label || '종사 산업군 선택'}
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
