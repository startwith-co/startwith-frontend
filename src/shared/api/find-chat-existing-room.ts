import { collection, getDocs, query, where } from 'firebase/firestore';
import db from 'fire-config';

async function findChatExistingRoom(consumerSeq: string, vendorSeq: string) {
  const chatsRef = collection(db, 'chats');
  const q = query(
    chatsRef,
    where('consumerSeq', '==', consumerSeq),
    where('vendorSeq', '==', vendorSeq),
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return doc.id;
  }

  return null;
}

export default findChatExistingRoom;
