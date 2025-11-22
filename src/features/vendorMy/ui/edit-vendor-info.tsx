'use client';

import { Button } from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { useFormContext, useWatch } from 'react-hook-form';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function EditVendorInfo({
  onSave,
  isLoading,
}: {
  onSave: () => void;
  isLoading: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    control,
  } = useFormContext();

  const file = useWatch({ control, name: 'profileImage' });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file instanceof File && file.name) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }

    setPreviewUrl(null);
    return () => null;
  }, [file]);

  const handleVendorUploadImageClick = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newFile = e.target.files?.[0] ?? null;
    if (newFile) {
      setValue('profileImage', newFile, { shouldDirty: true });
    }
    e.target.value = '';
  };

  const onPlusImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form
      onSubmit={handleSubmit(() => {
        onSave();
      })}
      className="relative flex flex-col justify-between rounded-xl bg-white p-8 shadow-md"
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleVendorUploadImageClick}
        className="hidden"
      />
      <div className="relative inline-block">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Profile image placeholder"
            width={100}
            height={100}
            className="mb-7 size-24 rounded-full bg-gray-100 object-contain"
            onError={() => setPreviewUrl(null)}
          />
        ) : (
          <Image
            src="/images/profileAdd.png"
            alt="Profile image placeholder"
            width={100}
            height={100}
            className="mb-7 size-24 rounded-full bg-gray-100"
          />
        )}
        <Image
          src="/images/add.png"
          alt="Add image icon"
          width={20}
          height={20}
          className="absolute top-27 left-25 z-10 cursor-pointer"
          onClick={onPlusImageClick}
        />
      </div>
      <div>
        <label htmlFor="vendorName" className="text-sm">
          기업명(사업자명)<span className="text-red-500">*</span>
          <Input
            id="vendorName"
            type="text"
            maxLength={15} // 최대 15자 제한
            {...register('vendorName', {
              required: '기업명을 입력해주세요.',
              maxLength: {
                value: 15,
                message: '기업명은 최대 15자까지만 입력 가능합니다.',
              },
            })}
            name="vendorName"
            className="bg-vendor-gray mt-2 mb-2 h-[40px] indent-2"
            onChange={(e) => {
              // 15자 초과 방지
              const trimmed = e.target.value.slice(0, 15);
              setValue('vendorName', trimmed, { shouldDirty: true });
            }}
          />
        </label>
        {errors.vendorName && (
          <p className="text-sm text-red-500">{`${errors.vendorName.message}`}</p>
        )}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="text-sm">
          담당자 연락처(휴대폰)<span className="text-red-500">*</span>
          <Input
            id="phoneNumber"
            type="text"
            inputMode="numeric"
            placeholder="000-0000-0000"
            {...register('phoneNumber', {
              required: '담당자 연락처를 입력해주세요.',
              pattern: {
                value: /^\d{3}-\d{4}-\d{4}$/,
                message:
                  '올바른 휴대폰 번호 형식(000-0000-0000)으로 입력해주세요.',
              },
            })}
            name="phoneNumber"
            className="bg-vendor-gray mt-2 mb-2 h-[40px] indent-2"
            onChange={(e) => {
              // 숫자만 추출
              let digits = e.target.value.replace(/\D/g, '');

              // 자동 포맷팅 (3-4-4)
              if (digits.length > 3 && digits.length <= 7)
                digits = `${digits.slice(0, 3)}-${digits.slice(3)}`;
              else if (digits.length > 7)
                digits = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;

              setValue('phoneNumber', digits, { shouldDirty: true });
            }}
            maxLength={13} // 최대 13자 (000-0000-0000)
          />
        </label>

        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{`${errors.phoneNumber.message}`}</p>
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
          <p className="text-sm text-red-500">{`${errors.email.message}`}</p>
        )}
      </div>

      <div>
        <label htmlFor="accountNumber" className="text-sm">
          사업자 계좌번호 <span className="text-red-500">*</span>
          <Input
            id="accountNumber"
            type="text"
            inputMode="numeric"
            maxLength={14} // 최대 14자리 제한
            {...register('accountNumber', {
              required: '계좌번호를 입력해주세요.',
              pattern: {
                value: /^[0-9]+$/,
                message: '계좌번호는 숫자만 입력 가능합니다.',
              },
              maxLength: {
                value: 14,
                message: '계좌번호는 최대 14자리까지만 입력 가능합니다.',
              },
            })}
            name="accountNumber"
            className="bg-vendor-gray mt-2 mb-2 h-[40px] indent-2"
            onChange={(e) => {
              // 숫자만 허용, 14자리 초과 입력은 자동으로 잘라냄
              const onlyNumbers = e.target.value
                .replace(/[^0-9]/g, '')
                .slice(0, 14);
              setValue('accountNumber', onlyNumbers, { shouldDirty: true });
            }}
          />
        </label>
        {errors.accountNumber && (
          <p className="text-sm text-red-500">{`${errors.accountNumber.message}`}</p>
        )}
      </div>
      <div>
        <label htmlFor="bank" className="text-sm">
          은행명<span className="text-red-500">*</span>
          <Input
            id="bank"
            type="string"
            {...register('bank')}
            name="bank"
            className="bg-vendor-gray mt-2 h-[40px] indent-2"
          />
        </label>
        {errors.bank && (
          <p className="text-sm text-red-500">{`${errors.bank.message}`}</p>
        )}
      </div>
      <Button
        asChild={false}
        className="mt-5 h-[40px] w-[185px] self-center"
        variant="graySubmit"
        onClick={() => {}}
        type="submit"
        disabled={!isDirty || isLoading}
      >
        {isLoading ? '수정 중...' : '수정 완료'}
      </Button>
    </form>
  );
}

export default EditVendorInfo;
