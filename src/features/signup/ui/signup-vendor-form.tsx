'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import signupVendorPost from '@/features/signup/api/signupVendorPost';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';

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
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <SignupForm
      action={(prevState, formData) =>
        signupVendorPost(prevState, formData, file)
      }
      buttonProps="bg-gradient-to-r from-[#2D2D2D] to-[#404040] text-white w-full h-[60px] font-extrabold text-lg shadow-sm"
      buttonName="솔루션 공급사로 파트너쉽 시작"
      loadingText="신청 중.."
    >
      <div className="flex gap-6">
        <div className="space-y-4">
          <Input
            {...register('company')}
            placeholder="기업명(사업자명)"
            className="h-[55px] w-[600px] bg-white indent-2"
          />
          {errors.company && (
            <p className="text-sm text-red-500">{errors.company.message}</p>
          )}

          <Input
            {...register('name')}
            placeholder="담당자 성함"
            className="h-[55px] w-[600px] bg-white indent-2"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          <Input
            {...register('phoneNumber')}
            placeholder="담당자 연락처(휴대폰)"
            className="h-[55px] w-[600px] bg-white indent-2"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}

          <Input
            {...register('email')}
            placeholder="이메일 입력"
            className="h-[55px] w-[600px] bg-white indent-2"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          <Input
            type="password"
            {...register('password')}
            placeholder="비밀번호 입력 *8~16자리 입력, 특수기호(!@#) 1개 포함"
            className="h-[55px] w-[600px] bg-white indent-2"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex h-full flex-col items-center space-y-2">
          <Button
            type="button"
            asChild={false}
            onClick={handleClickFileInput}
            className="flex h-[270px] w-[200px] cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white"
          >
            {preview ? (
              <Image
                src={preview}
                alt="미리보기"
                width={200}
                height={270}
                className="rounded-lg object-cover"
              />
            ) : (
              <Plus size={70} className="font-bold text-gray-400" />
            )}
          </Button>

          <input
            id="file"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            type="button"
            asChild={false}
            onClick={handleClickFileInput}
            className="mt-4 h-[50px] w-full bg-white text-sm text-[#5B76FF] shadow-sm"
          >
            사업자 등록증 첨부하기
          </Button>
        </div>
      </div>
    </SignupForm>
  );
}

export default SignupVendorForm;
