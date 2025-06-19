'use client';

import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { useState, useEffect } from 'react';
import api from '@/shared/api/index-api';
import { ApiResponse } from '@/shared/model/apiType';
import { ConsumerInfoProps } from '@/views/vendorMy/model/type';

function useFetchConsumer() {
  const { consumerSeq } = useChatMeta();
  const [consumerInfo, setConsumerInfo] = useState<ConsumerInfoProps | null>(
    null,
  );

  useEffect(() => {
    if (!consumerSeq) return;
    const fetchConsumerInfo = async () => {
      const info: ApiResponse<ConsumerInfoProps> = await api
        .get(`api/b2b-service/consumer?consumerSeq=${String(consumerSeq)}`)
        .json();
      setConsumerInfo(info.data);
    };
    fetchConsumerInfo();
  }, [consumerSeq]);

  return { consumerInfo };
}

export default useFetchConsumer;
