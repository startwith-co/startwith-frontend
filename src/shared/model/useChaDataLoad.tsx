import { useEffect, useState } from 'react';
import api from '@/shared/api/client-api';
import { ApiResponse } from '@/shared/model/apiType';
import {
  ConsumerInfoProps,
  VendorInfoProps,
} from '@/views/vendorMy/model/type';

function useChatDataLoad({
  role,
  vendorSeq,
  consumerSeq,
}: {
  role?: string;
  vendorSeq: string;
  consumerSeq: string;
}) {
  const [img, setImg] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const getData = async () => {
      if (role === 'consumer') {
        const data = await api
          .get<
            ApiResponse<VendorInfoProps>
          >(`api/b2b-service/vendor?vendorSeq=${vendorSeq}`)
          .json();
        setImg(data?.data?.profileImage || '/images/default-profile.svg');
        setName(data?.data?.vendorName || 'user');
      } else {
        const data = await api
          .get<
            ApiResponse<ConsumerInfoProps>
          >(`api/b2b-service/consumer?consumerSeq=${consumerSeq}`)
          .json();
        setImg(data?.data?.consumerImageUrl || '/images/default-profile.svg');
        setName(data?.data?.consumerName || 'user');
      }
    };
    getData();
  }, [vendorSeq, consumerSeq, role]);

  return { img, name };
}

export default useChatDataLoad;
