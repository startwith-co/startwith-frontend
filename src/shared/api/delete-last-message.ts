import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import db from 'fire-config';

async function deleteLastMessage(roomId: string) {
  const messagesRef = collection(db, 'chats', roomId, 'messages');

  const lastMessageQuery = query(
    messagesRef,
    orderBy('createdAt', 'desc'),
    limit(1),
  );
  const snapshot = await getDocs(lastMessageQuery);

  if (snapshot.empty) {
    console.log('메시지가 없습니다.');
    return;
  }

  const lastDoc = snapshot.docs[0];
  const lastDocRef = doc(db, 'chats', roomId, 'messages', lastDoc.id);

  await deleteDoc(lastDocRef);
}
export default deleteLastMessage;
