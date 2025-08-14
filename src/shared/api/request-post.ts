import sendMessageJson from '@/shared/api/send-message-json';
import { v4 as uuidv4 } from 'uuid';

/**
 *
 * @param solutionName 계약명(솔루션명)
 * @param solutionPrice 결제 요청 금액
 * @param solutionCategory 솔루션 카테고리
 * @param messageId 메시지 ID
 * @param messageName 메시지 이름
 * @param userId 사용자 ID
 * @param vendorId 판매자 ID
 * @param userName 사용자 이름
 * @param vendorName 판매자 이름
 * @param type 'request-card' | 'cancel-request-card' | 'cancel-complete-card' | 'pay-complete-card'
 */

async function requestPost(
  solutionName: string,
  solutionPrice: string,
  solutionCategory: string,
  messageId: string,
  messageName: string,
  consumerId: string,
  consumerName: string,
  vendorId: string,
  vendorName: string,
  type:
    | 'request-card'
    | 'cancel-request-card'
    | 'cancel-complete-card'
    | 'pay-complete-card',
  uuid: string,
  orderId?: string,
  paymentEventSeq?: string,
): Promise<void> {
  const messagePayload = {
    type,
    solutionName,
    solutionCategory,
    solutionPrice,
    uuid,
    orderId,
    paymentEventSeq,
  };

  await sendMessageJson(
    JSON.stringify(messagePayload),
    messageId,
    messageName,
    consumerId,
    vendorId,
    consumerName,
    vendorName,
  );
}

export default requestPost;
