'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import WhiteBox from '@/shared/ui/white-box';
import { useEffect } from 'react';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import api from '@/shared/api/index-api';
import { ApiResponse } from '@/shared/model/apiType';
import { ConsumerDetailType } from '@/shared/model/consumerDetailType';
import { useRouter } from 'next/navigation';
import useCurrentSession from '@/shared/model/useCurrentSession';

interface InquireCardProps {
  vendorName: string;
  vendorId: string;
  vendorSeq: number;
  solutionName: string;
}

export default function InquireCard({
  vendorName,
  vendorId,
  vendorSeq,
  solutionName,
}: InquireCardProps) {
  const { setChatMeta, consumerId: curConsumerId } = useChatMeta();
  const router = useRouter();
  const { session, status } = useCurrentSession();

  useEffect(() => {
    const fetchConsumer = async () => {
      if (!session?.consumerSeq) return;
      const { consumerSeq } = session;

      const res = await api
        .get(`api/b2b-service/consumer?consumerSeq=${consumerSeq}`)
        .json<ApiResponse<ConsumerDetailType>>();

      setChatMeta({
        vendorName,
        vendorId,
        vendorSeq,
        consumerName: res.data.consumerName,
        consumerId: res.data.consumerUniqueType,
        consumerSeq: res.data.consumerSeq,
        solutionName,
      });
    };

    fetchConsumer();
  }, [session, setChatMeta, vendorId, vendorName, vendorSeq]);

  return (
    <div className="flex flex-col gap-6">
      <WhiteBox className="flex flex-col items-center justify-center p-6">
        <Avatar className="mb-3.5 size-26">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-xl font-bold">{vendorName}</span>
        {session?.uniqueType !== vendorId && status === 'authenticated' && (
          <Button
            asChild={false}
            className="mt-4.5 w-full rounded-3xl"
            onClick={() => {
              router.push(
                `/chat?vendorId=${vendorId}&consumerId=${curConsumerId}`,
              );
            }}
          >
            실시간 상담하기
          </Button>
        )}
      </WhiteBox>
    </div>
  );
}
