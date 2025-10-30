import sendMessageJson from '@/shared/api/send-message-json';

type SolutionInfo = {
  name: string;
  price: string;
  category: string;
};

type MessageInfo = {
  id: string;
  name: string;
  consumerName: string;
  vendorName: string;
  vendorSeq: string;
  consumerSeq: string;
};

type RequestCardType =
  | 'request-card'
  | 'cancel-request-card'
  | 'cancel-complete-card'
  | 'pay-complete-card';

type RequestPostOptions = {
  type: RequestCardType;
  uuid: string;
  solutionInfo: SolutionInfo;
  messageInfo: MessageInfo;
  orderId?: string;
  paymentEventSeq?: string;
};

async function requestPost({
  type,
  uuid,
  solutionInfo,
  messageInfo,
  orderId,
  paymentEventSeq,
}: RequestPostOptions): Promise<void> {
  const messagePayload = {
    type,
    solutionName: solutionInfo.name,
    solutionCategory: solutionInfo.category,
    solutionPrice: solutionInfo.price,
    uuid,
    orderId,
    paymentEventSeq,
  };

  await sendMessageJson(
    JSON.stringify(messagePayload),
    messageInfo.id,
    messageInfo.name,
    messageInfo.consumerName,
    messageInfo.vendorName,
    messageInfo.vendorSeq,
    messageInfo.consumerSeq,
    solutionInfo.name,
  );
}

export default requestPost;
