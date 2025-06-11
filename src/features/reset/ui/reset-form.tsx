'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import ErrorMessage from '@/shared/ui/error-message';
import CustomModal from '@/shared/ui/custommodal';
import { redirect } from 'next/navigation';
import resetPost from '../api/resetPost';

const passwordRegex = /^(?=.*[!@#])[A-Za-z\d!@#]{8,16}$/;

const schema = z.object({
  password: z
    .string()
    .min(8)
    .max(16)
    .regex(
      passwordRegex,
      '비밀번호는 특수문자(!@#)를 1개 이상 포함해야 합니다.',
    ),
  confirmPassword: z.string().min(1, '비밀번호 확인 입력해주세요.'),
});

type FormSchema = z.infer<typeof schema>;

function ResetForm() {
  const {
    register,
    formState: { errors, isValid },
    setError,
    setValue,
    getValues,
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const [open, setOpen] = useState(false);
  const [matchSuccess, setMatchSuccess] = useState(false);

  const handleConfirmClick = () => {
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
  const confirmValid = watch('confirmPassword');
  return (
    <>
      <SignupForm
        action={async (prevState, formData) => {
          await resetPost(prevState, formData);
          setOpen(true);
        }}
        buttonProps="bg-gradient-to-t from-[#6E86FF] to-[#5B76FF] text-white w-full h-[55px] font-bold text-sm mt-4"
        buttonName="비밀번호 재설정 완료"
        buttonWrapperClassName="flex justify-center"
        loadingText="재설정 중.."
        formProps="border-0 space-y-4 w-[500px]"
        disabled={!isValid || !matchSuccess}
      >
        <div>
          <Input
            id="password"
            type="password"
            {...register('password')}
            name="password"
            placeholder="비밀번호 입력 *8~16자리 입력, 특수기호(!@#) 1개 포함"
            className="h-[45px] w-full bg-white indent-2 text-black"
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
        </div>

        <div>
          <div className="grid grid-cols-[3fr_1fr] items-center gap-2">
            <Input
              placeholder="비밀번호 확인"
              className="h-[45px] w-full bg-white indent-2"
              type="password"
              {...register('confirmPassword')}
            />
            <Button
              type="button"
              onClick={handleConfirmClick}
              variant="textBlue"
              asChild={false}
              disabled={!isValid || confirmValid.length < 8}
              className="h-[45px] text-sm text-[#7A7A7A] shadow-sm"
            >
              확인
              {matchSuccess && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </Button>
          </div>

          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword.message} />
          )}
        </div>
      </SignupForm>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title="비밀번호 변경이 완료되었습니다"
        contentProps="h-[180px] w-[450px] rounded-2xl px-7 py-8"
        subTitleDescription="다시 로그인해주세요"
        titleProps="text-center text-xl font-extrabold text-[#5B76FF]"
      >
        <div className="flex justify-center bg-white">
          <Button
            asChild={false}
            type="button"
            onClick={() => redirect('/login')}
            variant="bgBlueGradient"
            className="h-[50px] w-full shadow-md"
          >
            확인
          </Button>
        </div>
      </CustomModal>
    </>
  );
}

export default ResetForm;
