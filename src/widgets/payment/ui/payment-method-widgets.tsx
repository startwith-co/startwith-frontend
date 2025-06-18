'use client';

import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import { PaymentInfoProps } from '@/views/payment/model/type';
import { WidgetsProps } from '@/widgets/payment/model/type';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/shared/ui/button';

export default function PaymentMethodWidgets({
  actualAmount,
  paymentEventName,
  phoneNumber,
  email,
  vendorName,
  paymentEventSeq,
}: PaymentInfoProps) {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<WidgetsProps>();
  const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
  // TODO: customerKey => 무작위
  const customerKey = uuidv4();

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const newWidgets = tossPayments.widgets({
        customerKey,
      });
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(newWidgets);
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount({ currency: 'KRW', value: actualAmount });

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount({ currency: 'KRW', value: actualAmount });
  }, [widgets, actualAmount]);

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-8">
      <div className="box_section rounded-md py-8 shadow-md" id="pay">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* TODO: UI 어떤식으로 구성할지 상의 후 결정 */}
        {ready && (
          <div className="flex justify-center">
            <Button
              asChild={false}
              className="mx-auto h-14 w-96"
              disabled={!ready}
              onClick={async () => {
                try {
                  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                  // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                  // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                  // TODO: random orderID 설정
                  await widgets?.requestPayment({
                    orderId: uuidv4(),
                    orderName: `${paymentEventName}`,
                    successUrl: `${window.location.origin}/payment/success?paymentEventSeq=${paymentEventSeq}`,
                    failUrl: `${window.location.origin}/payment/fail?paymentEventSeq=${paymentEventSeq}`,
                    customerEmail: email,
                    customerName: vendorName,
                    customerMobilePhone: phoneNumber.replace(/-/g, ''),
                  });
                } catch (error) {
                  // TODO: 에러 종류에 따라 다른 UI 처리(toast)
                  alert(error);
                }
              }}
            >
              결제하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
