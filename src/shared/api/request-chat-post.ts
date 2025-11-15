import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import db from 'fire-config';
import createRoom from './create-room';
import findChatExistingRoom from './find-chat-existing-room';

type SolutionInfo = {
  name: string;
  price: string;
  category: string;
};

type MessageInfo = {
  id: string;
  name: string;
  role: 'consumer' | 'vendor';
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

/**
 * 🔹 Firestore에 메시지(카드형 요청 등)를 저장하는 함수
 *  - 채팅방이 없으면 createRoom 자동 생성
 *  - 채팅방이 있으면 해당 roomId에 메시지 추가
 */
async function requestChatPost({
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

  // 내부 메시지 전송 로직
  await sendMessageJson(
    JSON.stringify(messagePayload),
    messageInfo.id,
    messageInfo.name,
    messageInfo.consumerName,
    messageInfo.vendorName,
    messageInfo.vendorSeq,
    messageInfo.consumerSeq,
    solutionInfo.name,
    messageInfo.role,
  );
}

/**
 * 🔹 Firestore 메시지 전송 함수
 *  - 기존 채팅방 존재 여부 확인 후 메시지 저장
 *  - 없을 경우 새로운 방 생성 후 메시지 저장
 */
async function sendMessageJson(
  message: string,
  messageId: string,
  messageName: string,
  consumerName: string,
  vendorName: string,
  vendorSeq: string,
  consumerSeq: string,
  solutionName: string,
  role: 'consumer' | 'vendor',
) {
  const newRoomId = uuidv4();
  let roomId = await findChatExistingRoom(consumerSeq, vendorSeq);

  // 방이 없으면 새 방 생성
  if (!roomId) {
    await createRoom(
      newRoomId,
      consumerName,
      vendorName,
      consumerSeq,
      vendorSeq,
      solutionName,
      '',
    );
    roomId = newRoomId;
  }

  // 메시지 저장
  await addDoc(collection(db, 'chats', roomId, 'messages'), {
    message,
    createdAt: serverTimestamp(),
    messageId,
    messageName,
    role,
  });
}

export default requestChatPost;
