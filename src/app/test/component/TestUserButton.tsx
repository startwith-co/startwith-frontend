import { useEffect } from 'react';
import { ApiResponse } from '@/shared/model/apiType';
import { VendorDetailType } from '@/shared/model/vendorDetailType';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { ConsumerDetailType } from '@/shared/model/consumerDetailType';
import Link from 'next/link';
import api from '@/shared/api/index-api';

export default function TestUserButton() {
  const { setChatMeta, consumerId, vendorId } = useChatMeta();
  const vendorSeq = 1;
  const consumerSeq = 2;

  useEffect(() => {
    const vendorPromise = api
      .get(`api/b2b-service/vendor?vendorSeq=${vendorSeq}`)
      .json<ApiResponse<VendorDetailType>>();

    const consumerPromise = api
      .get(`api/b2b-service/consumer?consumerSeq=${consumerSeq}`)
      .json<ApiResponse<ConsumerDetailType>>();

    Promise.all([vendorPromise, consumerPromise])
      .then(([vendorRes, consumerRes]) => {
        setChatMeta({
          vendorName: vendorRes.data.vendorName,
          vendorId: vendorRes.data.vendorUniqueType,
          vendorSeq: vendorRes.data.vendorSeq,
          consumerName: consumerRes.data.consumerName,
          consumerId: consumerRes.data.consumerUniqueType,
          consumerSeq: consumerRes.data.consumerSeq,
        });
      })
      .catch((err) => {
        console.error('chatMeta fetch failed:', err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 font-bold">
      <Link href={`/chat?consumerId=${consumerId}&vendorId=${vendorId}`}>
        user test
      </Link>
      <Link href={`/vendor/chat?consumerId=${consumerId}&vendorId=${vendorId}`}>
        vendor test
      </Link>
    </div>
  );
}
