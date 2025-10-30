'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import WhiteBox from '@/shared/ui/white-box';
import { useEffect } from 'react';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import api from '@/shared/api/client-api';
import { ApiResponse } from '@/shared/model/apiType';
import { ConsumerDetailType } from '@/shared/model/consumerDetailType';
import { useRouter } from 'next/navigation';
import useCurrentSession from '@/shared/model/useCurrentSession';
import createPaymentEvent from '../api/createPaymentEvent';

interface InquireCardProps {
  vendorName: string;
  vendorSeq: number;
  solutionName: string;
  amount: number;
  category: string;
  profileImage: string;
}

export default function InquireCard({
  vendorName,
  vendorSeq,
  solutionName,
  amount,
  category,
  profileImage,
}: InquireCardProps) {
  const { setChatMeta } = useChatMeta();
  const router = useRouter();
  const { session, status } = useCurrentSession();
  const handlePaymentClick = async () => {
    try {
      const paymentEvent = await createPaymentEvent({
        consumerSeq: session?.consumerSeq || 0,
        vendorSeq,
        category,
        paymentEventName: solutionName,
        amount,
      });
      router.push(
        `/payment?paymentEventSeq=${paymentEvent.paymentEventSeq}&vendorSeq=${vendorSeq}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchConsumer = async () => {
      if (!session?.consumerSeq) return;
      const { consumerSeq } = session;

      const res = await api
        .get(`api/b2b-service/consumer?consumerSeq=${consumerSeq}`)
        .json<ApiResponse<ConsumerDetailType>>();

      setChatMeta({
        vendorName,
        vendorSeq: String(vendorSeq),
        consumerName: res.data.consumerName,
        consumerSeq: String(res.data.consumerSeq),
        solutionName,
        userImg: res.data.consumerImageUrl,
      });
    };

    fetchConsumer();
  }, [session, setChatMeta, vendorSeq, vendorName]);

  return (
    <div className="flex flex-col gap-6">
      <WhiteBox className="flex flex-col items-center justify-center p-6">
        <Avatar className="mb-3.5 size-26">
          <AvatarImage src={profileImage || '/images/default-profile.svg'} />
          <AvatarFallback>{vendorName[0]}</AvatarFallback>
        </Avatar>
        <span className="text-xl font-bold">{vendorName}</span>
        {session?.vendorSeq !== vendorSeq && status === 'authenticated' && (
          <div>
            <Button
              asChild={false}
              className="text-primary border-primary mt-5 w-full rounded-3xl border-2 bg-white hover:text-white"
              onClick={() => {
                router.push(
                  `/chat?vendorId=${vendorSeq}&consumerId=${session?.consumerSeq}`,
                );
              }}
            >
              실시간 상담하기
            </Button>
            <Button
              asChild={false}
              className="mt-5 w-full rounded-3xl"
              onClick={() => handlePaymentClick()}
            >
              구매하기
            </Button>
          </div>
        )}
      </WhiteBox>
    </div>
  );
}
