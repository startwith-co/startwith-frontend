'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import editInfoPost from '@/features/my/api/editInfoPost';
import SignupIndustryModal from '@/features/signup/ui/signup-industry-modal';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import useFileUpload from '@/shared/model/useFileUpload';
import Image from 'next/image';

const schema = z.object({
  company: z.string().min(1, '기업명 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
});

type FormSchema = z.infer<typeof schema>;

function EditInfo() {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const [open, setOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const {
    preview,
    file,
    fileInputRef,
    handleClickFileInput,
    handleFileChange,
  } = useFileUpload();

  return (
    <SignupForm
      action={(prevState, formData) => editInfoPost(prevState, formData, file)}
      variant="bgBlueGradient"
      buttonProps="w-[180px] h-[35px] font-light text-sm"
      buttonName="수정하기"
      buttonWrapperClassName="flex justify-center"
      loadingText="수정 중.."
      disabled={!isValid || !selectedIndustry}
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
        <label htmlFor="company" className="text-sm text-[#A7A7A7]">
          기업명(사업자명)
          <Input
            id="company"
            type="string"
            {...register('company')}
            name="company"
            className="mt-2 mb-2 h-[40px] w-[600px] border-0 bg-[#F9F9F9] indent-2 text-black"
          />
        </label>
        {errors.company && (
          <p className="text-sm text-red-500">{errors.company.message}</p>
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
        <p className="text-sm text-[#A7A7A7]">종사 산업군</p>
        <Button
          type="button"
          asChild={false}
          className="mt-2 h-[40px] w-full justify-start bg-[#F9F9F9] font-semibold text-black"
          onClick={() => setOpen(true)}
        >
          {selectedIndustry || '종사 산업군 선택'}
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

export default EditInfo;
