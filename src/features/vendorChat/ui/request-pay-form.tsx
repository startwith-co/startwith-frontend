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
import deleteLastMessage from '@/shared/api/delete-last-message';
import { v4 as uuidv4 } from 'uuid';
import useChatParams from '@/shared/model/useChatParams';
import findChatExistingRoom from '@/shared/api/find-chat-existing-room';
import requestServerPost from '../api/requestServerPost';
import useRequestPaymentDetails from '../model/useRequestPaymentDetails';

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
    setValue,
    getValues,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      solutionPrice: '0',
    },
  });
  const { solutionDetails } = useRequestPaymentDetails();

  const [contractFile, setContractFile] = useState<File | null>(null);
  const [refundFile, setRefundFile] = useState<File | null>(null);
  const contractRef = useRef<HTMLInputElement>(null);
  const refundRef = useRef<HTMLInputElement>(null);
  const uuid = uuidv4();
  const { consumerSeq, vendorSeq } = useChatParams();

  const { setOpen } = useVendorModal();
  const { vendorName, consumerName } = useChatMeta();

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
        await requestPost({
          type: 'request-card',
          uuid,
          solutionInfo: {
            name: formData.solutionName,
            price: formData.solutionPrice,
            category: formData.solutionCategory,
          },
          messageInfo: {
            id: vendorSeq,
            name: vendorName,
            consumerName,
            vendorName,
            vendorSeq,
            role: 'vendor',
            consumerSeq,
          },
        });

        setOpen(false);
      } catch (secondErr) {
        const curRoomId = await findChatExistingRoom(consumerSeq, vendorSeq);
        if (!curRoomId) return;
        await deleteLastMessage(curRoomId);
        throw secondErr;
      }
    } catch (err) {
      console.error('요청 실패:', err);
    }
  };

  return (
    <SignupForm
      action={onSubmit}
      buttonProps="w-full h-[45px] text-white font-semibold mt-2 disabled:opacity-50"
      buttonName="결제 요청하기"
      buttonWrapperClassName="mt-4"
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
              <Select
                value={field.value}
                onValueChange={(selectedCategory) => {
                  // 카테고리 선택 시 로직 실행
                  field.onChange(selectedCategory); // 카테고리 필드 값을 업데이트

                  // 선택된 카테고리에 해당하는 솔루션 정보 찾기
                  const selectedSolution = solutionDetails.find(
                    (solution) => solution.serverCategory === selectedCategory,
                  );

                  // 해당하는 솔루션이 있으면 금액 자동 설정
                  if (selectedSolution) {
                    setValue('solutionPrice', String(selectedSolution.amount), {
                      shouldValidate: true, // 값을 변경한 후 유효성 검사 실행
                    });
                  }
                }}
              >
                <SelectTrigger className="mt-1 h-[45px] w-full rounded-md border border-[#BEBEBE] bg-[#F5F5F5] indent-2 text-black">
                  <SelectValue placeholder="솔루션 카테고리 선택" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-auto">
                  {solutionDetails.map((solution) => (
                    <SelectItem
                      key={solution.solutionSeq}
                      value={solution.serverCategory}
                    >
                      {solution.category}
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
        {Number(getValues('solutionPrice')).toLocaleString('ko-KR')}원
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
            accept=".pdf"
            className="hidden"
            onChange={(e) =>
              e.target.files && setContractFile(e.target.files[0])
            }
          />
          <Button
            asChild={false}
            type="button"
            onClick={() => contractRef.current?.click()}
            className="h-[45px] w-full bg-[#F5F5F5] text-xs text-[#7A7A7A]"
          >
            {contractFile
              ? contractFile.name
              : '+ 업로드하기(pdf만 가능, 20MB 이하)'}
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
            accept=".pdf"
            className="hidden"
            onChange={(e) => e.target.files && setRefundFile(e.target.files[0])}
          />
          <Button
            asChild={false}
            type="button"
            onClick={() => refundRef.current?.click()}
            className="h-[45px] w-full bg-[#F5F5F5] text-xs text-[#7A7A7A]"
          >
            {refundFile
              ? refundFile.name
              : '+ 업로드하기(pdf만 가능, 20MB 이하)'}
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
