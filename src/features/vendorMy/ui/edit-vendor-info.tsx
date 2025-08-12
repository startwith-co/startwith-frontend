'use client';

import { Button } from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

function EditVendorInfo({
  onSave,
  isLoading,
}: {
  onSave: () => void;
  isLoading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useFormContext();

  return (
    <form
      onSubmit={handleSubmit(() => {
        onSave();
      })}
      className="relative flex flex-col justify-between rounded-xl bg-white p-8 shadow-md"
    >
      <Image
        src="/images/profileAdd.png"
        alt="image"
        width={100}
        height={100}
        className="mb-7"
      />
      <Image
        src="/images/add.png"
        alt="image"
        width={20}
        height={20}
        className="absolute top-27 left-25 z-10"
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
        className="bg-vendor-gray mt-5 h-[40px] w-[185px] self-center font-bold text-black hover:bg-[#3c62d6] hover:text-white"
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
