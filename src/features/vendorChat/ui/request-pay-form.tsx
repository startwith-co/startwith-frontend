'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import requestPayPost from '@/features/vendorChat/api/requestPayPost';
import { notFound, useSearchParams } from 'next/navigation';

const schema = z.object({
  solutionName: z.string().min(1, '솔루션명 입력해주세요.'),
  workDate: z.string().min(1, '작업일 입력해주세요.'),
  solutionPrice: z.string().min(1, '솔루션 가격 입력해주세요.'),
});

type FormSchema = z.infer<typeof schema>;

function RequestPayForm() {
  const {
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const searchParams = useSearchParams();
  const vendorId = searchParams?.get('vendorId');
  const userId = searchParams?.get('userId');
  if (!vendorId || !userId) return notFound();

  const vendorName = 'vendorA';
  const userName = 'userA';

  return (
    <SignupForm
      action={(prevState, formData) =>
        requestPayPost(
          prevState,
          formData,
          vendorId,
          vendorName,
          userId,
          vendorId,
          userName,
          vendorName,
        )
      }
      buttonProps="bg-black text-white w-full h-[45px] font-light text-sm mt-8"
      buttonName="결제 요청하기"
      buttonWrapperClassName="flex justify-center"
      loadingText="결제 요청 중.."
      formProps="bg-[#212121] w-full"
    >
      <div>
        <label htmlFor="solutionName" className="text-sm text-[#A7A7A7]">
          솔루션명(서비스 내용)
          <Input
            id="solutionName"
            type="string"
            {...register('solutionName')}
            name="solutionName"
            className="mt-2 mb-2 h-[40px] w-full border-0 bg-[#3D3D3D] indent-2 text-white"
          />
        </label>
        {errors.solutionName && (
          <p className="text-sm text-red-500">{errors.solutionName.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="workDate" className="text-sm text-[#A7A7A7]">
          작업일
          <Input
            id="workDate"
            type="string"
            {...register('workDate')}
            name="workDate"
            className="mt-2 mb-2 h-[40px] w-full border-0 bg-[#3D3D3D] indent-2 text-white"
          />
        </label>
        {errors.workDate && (
          <p className="text-sm text-red-500">{errors.workDate.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="solutionPrice" className="text-sm text-[#A7A7A7]">
          솔루션 가격
          <Input
            id="solutionPrice"
            type="string"
            {...register('solutionPrice')}
            name="solutionPrice"
            className="mt-2 mb-2 h-[40px] w-full border-0 bg-[#3D3D3D] indent-2 text-white"
          />
        </label>
        {errors.solutionPrice && (
          <p className="text-sm text-red-500">{errors.solutionPrice.message}</p>
        )}
      </div>
    </SignupForm>
  );
}

export default RequestPayForm;
