import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db from '../../../fire-config';
import { Message } from '../model/roomType';

async function getMessagesById(roomId: string): Promise<Message[]> {
  const messagesCollection = collection(db, 'chats', roomId, 'messages');
  const q = query(messagesCollection, orderBy('createdAt'));

  const querySnapshot = await getDocs(q);
  const messages: Message[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Message[];

  return messages;
}
export default getMessagesById;
