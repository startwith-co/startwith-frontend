import {
  serverTimestamp,
  addDoc,
  collection,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import db from 'fire-config';
import createRoom from './create-room';
import findChatExistingRoom from './find-chat-existing-room';

async function sendMessageJson(
  message: string,
  messageId: string,
  messageName: string,
  consumerId: string,
  vendorId: string,
  consumerName: string,
  vendorName: string,
) {
  const newRoomId = uuidv4();
  const roomId = await findChatExistingRoom(consumerId, vendorId);

  // 벤더가 채팅을 먼저 걸일이 없음

  if (!roomId) {
    await createRoom(
      newRoomId,
      consumerId,
      vendorId,
      consumerName,
      vendorName,
      messageId,
      message,
      messageName,
      '',
      '',
      '',
    );
  }

  await addDoc(collection(db, 'chats', roomId || newRoomId, 'messages'), {
    message,
    createdAt: serverTimestamp(),
    messageId,
    messageName,
  });

  await updateDoc(doc(db, 'chats', roomId || newRoomId), {
    lastMessage: {
      messageId,
      message,
      messageName,
      updatedAt: serverTimestamp(),
    },
  });
}

export default sendMessageJson;
