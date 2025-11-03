import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import db from 'fire-config';

async function createRoom(
  roomId: string,
  consumerName: string,
  vendorName: string,
  consumerSeq: string,
  vendorSeq: string,
  solutionName: string,
  userImg: string,
) {
  const roomRef = doc(db, 'chats', roomId);

  await setDoc(roomRef, {
    roomId,
    consumerName,
    vendorName,
    consumerSeq,
    vendorSeq,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    solutionName,
    userImg,
  });

  console.log('방 생성 완료:', roomRef.path);
}

export default createRoom;
