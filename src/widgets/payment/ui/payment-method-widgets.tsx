import Switch from '@/shared/ui/switch';
import PaymentOptionButton from '@/features/select-payment-method/ui/payment-option-button';
import paymentMethods from '@/features/select-payment-method/model/payment-methods';

export default function PaymentMethodWidgets() {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-8">
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold">결제 방법</h2>
        <div className="flex flex-col gap-4 rounded-md bg-white p-6 text-sm shadow-md">
          <div className="flex flex-wrap gap-3.5">
            {paymentMethods.map((method) => (
              <PaymentOptionButton key={method} name={method} />
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <span>세금 계산서 발행 요청</span>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
}
