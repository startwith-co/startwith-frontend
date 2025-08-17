'use client';

import OrderDetailsWidget from '@/widgets/payment/ui/order-details-widget';
import TotalPriceWidget from '@/widgets/payment/ui/total-price-widget';
import VendorInfoWidget from '@/widgets/payment/ui/vendor-info-widget';
import PaymentMethodWidgets from '@/widgets/payment/ui/payment-method-widgets';
import { Button } from '@/shared/ui/button';
import { PaymentInfoProps } from '@/views/payment/model/type';
import { useState } from 'react';

export default function PaymentPage({
  paymentInfo,
  vendorSeq,
}: {
  paymentInfo: PaymentInfoProps;
  vendorSeq: string;
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
        consumerName={paymentInfo.consumerName}
        consumerPhone={paymentInfo.phoneNumber}
        consumerEmail={paymentInfo.email}
      />
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold">결제 수단 선택</h2>
        <PaymentMethodWidgets {...paymentInfo} vendorSeq={vendorSeq} />
      </div>
    </div>
  );
}
