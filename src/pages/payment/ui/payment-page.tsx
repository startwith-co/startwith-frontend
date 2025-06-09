'use client';

import OrderDetailsWidget from '@/widgets/payment/ui/order-details-widget';
import TotalPriceWidget from '@/widgets/payment/ui/total-price-widget';
import VendorInfoWidget from '@/widgets/payment/ui/vendor-info-widget';
import PaymentMethodWidgets from '@/widgets/payment/ui/payment-method-widgets';
import { Button } from '@/shared/ui/button';
import PaymentInfoProps from '@/pages/payment/model/type';
import { useState } from 'react';

export default function PaymentPage({
  paymentInfo,
}: {
  paymentInfo: PaymentInfoProps;
}) {
  const [paymentMethod, setPaymentMethod] = useState<
    'creditCard' | 'virtualAccount'
  >('creditCard');

  return (
    <div className="mt-20 mb-68 flex flex-col gap-14">
      <div className="grid grid-cols-[2fr_1fr] items-stretch gap-8">
        <OrderDetailsWidget {...paymentInfo} />
        <TotalPriceWidget
          totalPrice={paymentInfo.amount}
          tax={paymentInfo.tax}
          actualAmount={paymentInfo.actualAmount}
        />
      </div>
      <VendorInfoWidget
        vendorName={paymentInfo.vendorName}
        vendorPhone={paymentInfo.phoneNumber}
        vendorEmail={paymentInfo.email}
      />
      <div className="grid grid-cols-[2fr_1fr] gap-8">
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">결제 수단 선택</h2>
          <div className="flex w-full gap-3.5 rounded-md bg-white p-6 shadow-md">
            <Button
              asChild={false}
              className={`h-[70px] w-[188px] ${
                paymentMethod === 'creditCard'
                  ? 'bg-primary text-white'
                  : 'bg-vendor-gray text-black hover:text-white'
              }`}
              onClick={() => setPaymentMethod('creditCard')}
            >
              신용카드
            </Button>
            <Button
              asChild={false}
              className={`h-[70px] w-[188px] ${
                paymentMethod === 'virtualAccount'
                  ? 'bg-primary text-white'
                  : 'bg-vendor-gray text-black hover:text-white'
              }`}
              onClick={() => setPaymentMethod('virtualAccount')}
            >
              가상 계좌
            </Button>
          </div>
        </div>
      </div>
      <PaymentMethodWidgets {...paymentInfo} />
    </div>
  );
}
