import { collection, getDocs, query, where } from 'firebase/firestore';
import db from 'fire-config';

async function findChatExistingRoom(userId: string, vendorId: string) {
  const chatsRef = collection(db, 'chats');
  const q = query(
    chatsRef,
    where('userId', '==', userId),
    where('vendorId', '==', vendorId),
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return doc.id;
  }

  return null;
}

export default findChatExistingRoom;
