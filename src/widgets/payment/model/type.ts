import {
  WidgetAgreementWidget,
  WidgetPaymentMethodWidget,
} from '@tosspayments/tosspayments-sdk';

export interface WidgetsProps {
  setAmount: ({
    currency,
    value,
  }: {
    currency: string;
    value: number;
  }) => Promise<void>;
  renderPaymentMethods: ({
    selector,
    variantKey,
  }: {
    selector: string;
    variantKey: string;
  }) => Promise<WidgetPaymentMethodWidget>;
  requestPayment: ({
    orderId,
    orderName,
    successUrl,
    failUrl,
    customerEmail,
    customerName,
    customerMobilePhone,
    method,
    virtualAccount,
  }: {
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    customerEmail: string;
    customerName: string;
    customerMobilePhone: string;
    method?: string;
    virtualAccount?: VirutalAccountProps;
  }) => Promise<void>;
  renderAgreement: ({
    selector,
    variantKey,
  }: {
    selector: string;
    variantKey: string;
  }) => Promise<WidgetAgreementWidget>;
}

interface VirutalAccountProps {
  cashReceipt: CashReceiptProps;
}

interface CashReceiptProps {
  type: '소득공제' | '지출증빙' | '미발행';
}
