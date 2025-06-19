'use client';

import { useState, useEffect } from 'react';
import getPaymentRequest from '../api/getPaymentRequest';
import PaymentRequestProps from './type';

function usePaymentRequest(uuid: string) {
  const [paymentRequestData, setPaymentRequestData] =
    useState<PaymentRequestProps | null>(null);

  useEffect(() => {
    const getPaymentRequestData = async () => {
      const data = await getPaymentRequest({
        paymentUniqueType: uuid,
      });
      setPaymentRequestData(data);
    };
    getPaymentRequestData();
  }, [uuid]);

  return paymentRequestData;
}

export default usePaymentRequest;
