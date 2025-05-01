import OrderDetailsWidget from '@/widgets/payment/ui/order-details-widget';
import TotalPriceWidget from '@/widgets/payment/ui/total-price-widget';
import CouponPointWidget from '@/widgets/payment/ui/coupon-point-widget';
import PaymentMethodWidgets from '@/widgets/payment/ui/payment-method-widgets';

export default function PaymentPage() {
  return (
    <div className="mt-20 mb-68 flex flex-col gap-14">
      <div className="grid grid-cols-[2fr_1fr] items-stretch gap-8">
        <OrderDetailsWidget />
        <TotalPriceWidget />
      </div>
      <CouponPointWidget />
      <PaymentMethodWidgets />
    </div>
  );
}
