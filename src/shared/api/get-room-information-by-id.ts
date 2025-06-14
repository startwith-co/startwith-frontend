import { collection, getDocs, query, where } from 'firebase/firestore';
import db from 'fire-config';
import { ChatRoom } from '../model/roomType';

async function getRoomInformationById(
  consumerId: string,
  vendorId: string,
): Promise<ChatRoom | null> {
  const chatsCollection = collection(db, 'chats');

  const q = query(
    chatsCollection,
    where('consumerId', '==', consumerId),
    where('vendorId', '==', vendorId),
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return {
    roomId: doc.id,
    ...doc.data(),
  } as ChatRoom;
}

export default getRoomInformationById;
