'use client';

import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { useState, useEffect } from 'react';
import api from '@/shared/api/client-api';
import { ApiResponse } from '@/shared/model/apiType';
import { ConsumerInfoProps } from '@/views/vendorMy/model/type';
import { useSearchParams } from 'next/navigation';

function useFetchConsumer() {
  const { consumerSeq } = useChatMeta();
  const [consumerInfo, setConsumerInfo] = useState<ConsumerInfoProps | null>(
    null,
  );
  const searchParams = useSearchParams();
  const consumerId = searchParams.get('consumerId') as string;

  useEffect(() => {
    if (!consumerSeq || !consumerId) return;
    const fetchConsumerInfo = async () => {
      const info: ApiResponse<ConsumerInfoProps> = await api
        .get(`api/b2b-service/consumer?consumerSeq=${String(consumerSeq)}`)
        .json();
      setConsumerInfo(info.data);
    };
    fetchConsumerInfo();
  }, [consumerSeq, consumerId]);

  return { consumerInfo };
}

export default useFetchConsumer;
