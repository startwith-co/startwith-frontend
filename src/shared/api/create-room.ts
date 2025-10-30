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
  // chats 컬렉션 안에 roomId 문서 생성
  const roomRef = doc(db, 'chats', roomId);

  // 문서에 데이터 설정
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
