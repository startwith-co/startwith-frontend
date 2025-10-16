'use client';

import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import { useState, useEffect } from 'react';
import { VendorInfoProps } from '@/views/vendorMy/model/type';
import { ApiResponse } from '@/shared/model/apiType';
import { VendorCategoryProps } from '@/views/products/model/type';
import api from '@/shared/api/client-api';
import { useSearchParams } from 'next/navigation';

interface VendorInfos {
  vendorInfo: VendorInfoProps | null;
  vendorCategory: VendorCategoryProps[] | null;
}

function useFetchVendor() {
  const { vendorSeq } = useChatMeta();
  const [vendorInfo, setVendorInfo] = useState<VendorInfos | null>(null);
  const searchParams = useSearchParams();
  const vendorId = searchParams.get('vendorId') as string;

  useEffect(() => {
    if (!vendorSeq || !vendorId) return;

    const fetchAllVendorData = async () => {
      try {
        const [vendorInfoRes, vendorCategoryRes] = await Promise.all([
          api
            .get(`api/b2b-service/vendor?vendorSeq=${vendorSeq}`)
            .json<ApiResponse<VendorInfoProps>>(),
          api
            .get(`api/b2b-service/vendor/category?vendorSeq=${vendorSeq}`)
            .json<ApiResponse<VendorCategoryProps[]>>(),
        ]);

        setVendorInfo({
          vendorInfo: vendorInfoRes.data,
          vendorCategory: vendorCategoryRes.data,
        });
      } catch (err) {
        console.error('데이터 로딩 중 오류 발생:', err);
      }
    };

    fetchAllVendorData();
  }, [vendorSeq, vendorId]);

  return vendorInfo;
}

export default useFetchVendor;
