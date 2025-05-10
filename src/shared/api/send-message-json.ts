import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import db from '../../../fire-config';
import createRoom from './create-room';
import findChatExistingRoom from './find-chat-existing-room';

async function sendMessageJson(
  message: string,
  messageId: string,
  messageName: string,
  userId: string,
  vendorId: string,
  userName: string,
  vendorName: string,
  link: string,
) {
  const newRoomId = uuidv4();
  const roomId = await findChatExistingRoom(userId, vendorId);
  if (!roomId) {
    await createRoom(
      newRoomId,
      userId,
      vendorId,
      userName,
      vendorName,
      messageId,
      message,
      messageName,
    );
  }

  await addDoc(collection(db, 'chats', roomId || newRoomId, 'messages'), {
    message,
    createdAt: serverTimestamp(),
    messageId,
    messageName,
  });
  revalidatePath(link);
}
export default sendMessageJson;
