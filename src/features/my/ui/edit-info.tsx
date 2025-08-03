'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import SignupIndustryModal from '@/features/signup/ui/signup-industry-modal';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import useFileUpload from '@/shared/model/useFileUpload';
import Image from 'next/image';
import { industryToKo } from '@/shared/model/industryMap';
import { toast } from 'react-toastify';
import editInfoPost from '../api/editInfoPost';

const schema = z.object({
  company: z.string().min(1, '기업명 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  phoneNumber: z.string().min(1, '전화번호 입력해주세요.'),
  password: z.string().min(1, '비밀번호 입력해주세요.'),
});

type FormSchema = z.infer<typeof schema>;

interface EditInfoProps {
  company: string;
  email: string;
  phoneNumber: string;
  industry: string;
}

function EditInfo({ company, email, phoneNumber, industry }: EditInfoProps) {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      company,
      email,
      phoneNumber,
    },
  });

  const [open, setOpen] = useState(false);

  const [selectedIndustry, setSelectedIndustry] = useState<{
    label: string;
    value: string;
  } | null>({ label: industryToKo[industry], value: industry });
  const {
    preview,
    file,
    fileInputRef,
    handleClickFileInput,
    handleFileChange,
    setPreview,
  } = useFileUpload();

  return (
    <SignupForm
      action={async (prevState, formData) => {
        try {
          await editInfoPost(
            prevState,
            formData,
            file,
            selectedIndustry?.value,
          );
          // TODO: 나중에 수정 예정
          // setSelectedIndustry(null);
          // setPreview(null);
          window.location.reload();
        } catch (error) {
          toast.error('수정 중 오류가 발생했습니다.');
        }
      }}
      variant="bgBlueGradient"
      buttonProps="w-[180px] h-[35px] font-light text-sm"
      buttonName="수정하기"
      buttonWrapperClassName="flex justify-center"
      loadingText="수정 중.."
      disabled={!isValid || !selectedIndustry || !file}
    >
      <div className="flex items-center">
        <div className="relative mb-7 h-[100px] w-[100px]">
          <Image
            src={preview || '/images/profileAdd.png'}
            alt="profile"
            width={100}
            height={100}
            className="cursor-pointer rounded-full object-cover"
            onClick={handleClickFileInput}
          />
          {!preview && (
            <Image
              src="/images/add.png"
              alt="add icon"
              width={20}
              height={20}
              className="absolute top-[70px] left-[70px] z-10"
            />
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="text-sm text-[#5D5D5D]">
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
        <label htmlFor="email" className="text-sm text-[#5D5D5D]">
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
        <label htmlFor="phoneNumber" className="text-sm text-[#5D5D5D]">
          담당자 전화번호
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
        <p className="text-sm text-[#5D5D5D]">종사 산업군</p>
        <Button
          type="button"
          asChild={false}
          className="mt-2 h-[40px] w-full justify-start bg-[#F9F9F9] text-[#5D5D5D] hover:text-white"
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

      <div>
        <label htmlFor="password" className="text-sm text-[#A7A7A7]">
          비밀번호
          <Input
            id="password"
            type="password"
            {...register('password')}
            name="password"
            className="mt-2 mb-2 h-[40px] w-[600px] border-0 bg-[#F9F9F9] indent-2"
          />
        </label>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
    </SignupForm>
  );
}

export default EditInfo;
