import { collection, query, where, getDocs } from 'firebase/firestore';
import db from 'fire-config';
import { ChatRoom } from '../model/roomType';

async function getRoomsById(consumerId: string): Promise<ChatRoom[]> {
  const roomsRef = collection(db, 'chats');

  const q = query(roomsRef, where('consumerId', '==', consumerId));
  const querySnapshot = await getDocs(q);

  const rooms = querySnapshot.docs.map((doc) => ({
    roomId: doc.id,
    ...doc.data(),
  })) as ChatRoom[];
  return rooms;
}

export default getRoomsById;
