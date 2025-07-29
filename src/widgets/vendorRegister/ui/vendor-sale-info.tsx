import Input from '@/shared/ui/input';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '@/shared/ui/error-message';

export default function VendorSaleInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="rounded-md bg-white px-[35px] py-7.5 shadow-md 2xl:pr-[104px]">
      <h2 className="mb-6 text-lg font-semibold">판매 정보 입력</h2>
      <ul className="flex w-full flex-col gap-6 text-[13px] [&>li]:flex [&>li]:items-center [&>li>span]:w-[139px]">
        <li>
          <span>
            판매가<span className="text-red-500">*</span>
          </span>
          <Input
            type="number"
            className="bg-vendor-gray w-[220px] border-none text-center"
            placeholder="~ 0원(VAT별도)"
            {...register('amount')}
          />
          {errors.amount && (
            <ErrorMessage
              message={`${errors.amount.message}`}
              className="ml-5"
            />
          )}
        </li>
        <li>
          <span>
            개발 기간<span className="text-red-500">*</span>
          </span>
          <Input
            type="number"
            className="bg-vendor-gray w-[220px] border-none text-center"
            placeholder="0일"
            {...register('duration')}
          />
          {errors.duration && (
            <ErrorMessage
              message={`${errors.duration.message}`}
              className="ml-5"
            />
          )}
        </li>
      </ul>
    </div>
  );
}
