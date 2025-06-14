import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import db from 'fire-config';

async function createRoom(
  roomId: string,
  consumerId: string,
  vendorId: string,
  consumerName: string,
  vendorName: string,
  messageId: string,
  message: string,
  messageName: string,
  consumerSeq: string,
) {
  // chats 컬렉션 안에 roomId 문서 생성
  const roomRef = doc(db, 'chats', roomId);

  // 문서에 데이터 설정
  await setDoc(roomRef, {
    roomId,
    consumerId,
    consumerName,
    vendorName,
    vendorId,
    consumerSeq,
    lastMessage: {
      messageId,
      message,
      createdAt: serverTimestamp(),
      messageName,
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  console.log('방 생성 완료:', roomRef.path);
}

export default createRoom;
