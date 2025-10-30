import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import db from 'fire-config';
import createRoom from './create-room';
import findChatExistingRoom from './find-chat-existing-room';

async function sendMessageJson(
  message: string,
  messageId: string,
  messageName: string,
  consumerName: string,
  vendorName: string,
  vendorSeq: string,
  consumerSeq: string,
  solutionName: string,
) {
  const newRoomId = uuidv4();
  const roomId = await findChatExistingRoom(consumerSeq, vendorSeq);

  // 벤더가 채팅을 먼저 걸일이 없음

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
  }

  await addDoc(collection(db, 'chats', roomId || newRoomId, 'messages'), {
    message,
    createdAt: serverTimestamp(),
    messageId,
    messageName,
  });
}

export default sendMessageJson;
