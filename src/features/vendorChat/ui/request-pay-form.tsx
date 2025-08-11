'use client';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input';
import SignupForm from '@/shared/ui/signup-form';
import requestPost from '@/shared/api/request-post';
import { useState, useRef } from 'react';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useVendorModal } from '@/views/vendor/chat/model/VendorModalProvider';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { useRoomId } from '@/shared/model/RoomIdProvider';
import deleteLastMessage from '@/shared/api/delete-last-message';
import { v4 as uuidv4 } from 'uuid';
import requestServerPost from '../api/requestServerPost';
import useRequestCategory from '../model/requestCategory';

const schema = z.object({
  solutionName: z.string().min(1, '계약명을 입력해주세요.'),
  solutionCategory: z.string().min(1, '카테고리를 입력해주세요.'),
  solutionPrice: z.string().min(1, '금액을 입력해주세요.'),
});

type FormSchema = z.infer<typeof schema>;

function RequestPayForm() {
  const {
    register,
    formState: { errors, isValid },
    control,
    getValues,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const solutionCategoryOptions = useRequestCategory();

  const [contractFile, setContractFile] = useState<File | null>(null);
  const [refundFile, setRefundFile] = useState<File | null>(null);
  const contractRef = useRef<HTMLInputElement>(null);
  const refundRef = useRef<HTMLInputElement>(null);
  const { curRoomId } = useRoomId();
  const uuid = uuidv4();

  const { setOpen } = useVendorModal();
  const {
    vendorId,
    vendorName,
    consumerId,
    consumerName,
    vendorSeq,
    consumerSeq,
  } = useChatMeta();

  const onSubmit = async () => {
    const formData = getValues();

    try {
      // 1. 첫 번째 요청
      await requestServerPost({
        consumerSeq,
        vendorSeq,
        category: formData.solutionCategory,
        paymentEventName: formData.solutionName,
        amount: Number(formData.solutionPrice),
        contractConfirmationUrl: contractFile,
        refundPolicyUrl: refundFile,
        paymentEventUniqueType: uuid,
      });

      try {
        // 2. 두 번째 요청
        await requestPost(
          formData.solutionName,
          formData.solutionPrice,
          formData.solutionCategory,
          vendorId,
          vendorName,
          consumerId,
          consumerName,
          vendorId,
          vendorName,
          'request-card',
          uuid,
        );

        // 3. 모든 요청 성공 시
        setOpen(false);
      } catch (secondErr) {
        await deleteLastMessage(curRoomId!);
        throw secondErr;
      }
    } catch (err) {
      console.error('요청 실패:', err);
      // 첫 요청 실패 or 롤백 실패 → 아무것도 하지 않음
    }
  };

  return (
    <SignupForm
      action={onSubmit}
      buttonProps="w-full h-[45px] text-white font-semibold mt-2 disabled:opacity-50"
      buttonName="결제 요청하기"
      buttonWrapperClassName="mt-4"
      loadingText="요청 중..."
      formProps="w-full px-4 py-4 space-y-6"
      variant="bgBlueGradient"
      disabled={!isValid || !contractFile || !refundFile}
    >
      <h1 className="text-xl font-bold text-black">계약 정보</h1>
      <div className="grid grid-cols-[3fr_6fr] items-center">
        <p className="text-sm font-semibold text-black">계약명 *</p>
        <Input
          {...register('solutionName')}
          placeholder="계약명(솔루션명)을 입력해주세요."
          className="mt-1 h-[45px] w-full rounded-md bg-[#F1F1F1] indent-2 text-black"
        />
      </div>
      {errors.solutionName && (
        <p className="text-xs text-red-500">{errors.solutionName.message}</p>
      )}

      <h1 className="text-xl font-bold text-black">계약 및 결제</h1>
      <div className="grid grid-cols-[3fr_6fr] items-center">
        <p className="text-sm font-semibold text-black">솔루션 카테고리 *</p>
        <div className="w-full">
          <Controller
            name="solutionCategory"
            control={control}
            rules={{ required: '솔루션 카테고리를 선택해주세요.' }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="mt-1 h-[45px] w-full rounded-md border border-[#BEBEBE] bg-[#F5F5F5] indent-2 text-black">
                  <SelectValue placeholder="솔루션 카테고리 선택" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-auto">
                  {solutionCategoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        {errors.solutionCategory && (
          <p className="text-xs text-red-500">
            {errors.solutionCategory.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-[3fr_6fr] items-center">
        <p className="text-sm font-semibold text-black">결제 요청 금액 *</p>
        <Input
          {...register('solutionPrice')}
          className="mt-1 h-[45px] w-full rounded-md bg-[#F5F5F5] indent-2 text-black"
        />
        {errors.solutionPrice && (
          <p className="text-xs text-red-500">{errors.solutionPrice.message}</p>
        )}
      </div>

      <div className="grid grid-cols-[3fr_6fr] items-start gap-y-2">
        <p className="text-sm font-semibold text-black">계약 확인서 *</p>
        <div>
          <input
            ref={contractRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) =>
              e.target.files && setContractFile(e.target.files[0])
            }
          />
          <Button
            asChild={false}
            type="button"
            onClick={() => contractRef.current?.click()}
            className="h-[45px] w-full bg-[#F5F5F5] text-sm text-[#7A7A7A]"
          >
            {contractFile ? ' 업로드 완료' : '+ 업로드하기(pdf만 가능)'}
          </Button>
          {contractFile && contractFile.type.startsWith('image') && (
            <Image
              src={URL.createObjectURL(contractFile)}
              alt="계약서 미리보기"
              className="mt-2 max-h-40 rounded-md"
            />
          )}
        </div>
      </div>

      <h1 className="text-xl font-bold text-black">확인 및 고지</h1>
      <div className="grid grid-cols-[3fr_6fr] items-start gap-y-2">
        <p className="text-sm font-semibold text-black">자사 환불 정책 *</p>
        <div>
          <input
            ref={refundRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => e.target.files && setRefundFile(e.target.files[0])}
          />
          <Button
            asChild={false}
            type="button"
            onClick={() => refundRef.current?.click()}
            className="h-[45px] w-full bg-[#F5F5F5] text-sm text-[#7A7A7A]"
          >
            {refundFile ? '업로드 완료' : '+ 업로드하기(pdf만 가능)'}
          </Button>
          {refundFile && refundFile.type.startsWith('image') && (
            <Image
              src={URL.createObjectURL(refundFile)}
              alt="환불정책 미리보기"
              className="mt-2 max-h-40 rounded-md"
            />
          )}
        </div>
      </div>
    </SignupForm>
  );
}

export default RequestPayForm;
