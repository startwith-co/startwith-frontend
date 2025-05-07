'use client';

import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import { WidgetsProps } from '@/widgets/payment/model/type';

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = 'xaszxdbW4vJ08QWeRLRdT';

export default function PaymentMethodWidgets() {
  // TODO: 실제 데이터로 변경(쿠폰, 할인 적용 후)
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: 100,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<WidgetsProps>();

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
      await widgets.setAmount(amount);

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

    widgets.setAmount(amount);
  }, [widgets, amount]);

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-8">
      <div className="box_section rounded-md shadow-md">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* TODO: UI 어떤식으로 구성할지 상의 후 결정 */}
        {ready && (
          <button
            className="button"
            disabled={!ready}
            onClick={async () => {
              try {
                // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                // TODO: random orderID 설정, 이름, 메일, 핸드폰 번호 전부 사용자 맞춤으로 설정
                await widgets?.requestPayment({
                  orderId: 'y2Rv6eNn9bQZi-hrMWMWF',
                  orderName: '토스 티셔츠 외 2건',
                  successUrl: `${window.location.origin}/payment/success`,
                  failUrl: `${window.location.origin}/payment/fail`,
                  customerEmail: 'customer123@gmail.com',
                  customerName: '김토스',
                  customerMobilePhone: '01012341234',
                });
              } catch (error) {
                // TODO: 에러 종류에 따라 다른 UI 처리(toast)
                alert(error);
              }
            }}
          >
            결제하기
          </button>
        )}
      </div>
    </div>
  );
}
