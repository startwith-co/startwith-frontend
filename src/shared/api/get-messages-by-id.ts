import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db from 'fire-config';
import { ChatType } from '@/shared/model/chat-type';

async function getMessagesById(roomId: string): Promise<ChatType[]> {
  const messagesCollection = collection(db, 'chats', roomId, 'messages');
  const q = query(messagesCollection, orderBy('createdAt'));

  const querySnapshot = await getDocs(q);
  const messages: ChatType[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ChatType[];

  return messages;
}
export default getMessagesById;
