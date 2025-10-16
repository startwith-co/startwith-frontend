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

      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="Profile image placeholder"
          width={100}
          height={100}
          className="mb-7 size-24 rounded-full object-cover object-center"
          onError={() => setPreviewUrl(null)}
        />
      ) : (
        <Image
          src="/images/profileAdd.png"
          alt="Profile image placeholder"
          width={100}
          height={100}
          className="mb-7"
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
      <div>
        <label htmlFor="vendorName" className="text-sm">
          기업명(사업자명)<span className="text-red-500">*</span>
          <Input
            id="vendorName"
            type="string"
            {...register('vendorName')}
            name="vendorName"
            className="bg-vendor-gray mt-2 mb-2 h-[40px] indent-2"
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
            type="string"
            {...register('phoneNumber')}
            name="phoneNumber"
            className="bg-vendor-gray mt-2 mb-2 h-[40px] indent-2"
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
