export type Review = {
  consumerSeq: number;
  consumerName: string;
  consumerImageUrl: string;
  start: number;
  comment: string;
  createdAt: string;
};

export type PaymentEvent = {
  consumerSeq: number;
  vendorSeq: number;
  category: string;
  paymentEventName: string;
  amount: number;
};

export type PaymentEventResponse = {
  paymentEventSeq: number;
  paymentEventUniqueType: string;
};
