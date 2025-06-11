import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import db from 'fire-config';

async function deleteLastMessage(roomId: string) {
  const messagesRef = collection(db, 'chats', roomId, 'messages');

  // 1. 마지막 메시지 가져오기
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

  // 2. 메시지 삭제
  await deleteDoc(lastDocRef);

  // 3. 이전 메시지로 lastMessage 갱신 또는 초기화
  const secondLastQuery = query(
    messagesRef,
    orderBy('createdAt', 'desc'),
    limit(1),
  );
  const updatedSnapshot = await getDocs(secondLastQuery);

  if (!updatedSnapshot.empty) {
    const prevMsg = updatedSnapshot.docs[0].data();
    await updateDoc(doc(db, 'chats', roomId), {
      lastMessage: {
        messageId: prevMsg.messageId,
        message: prevMsg.message,
        messageName: prevMsg.messageName,
        updatedAt: prevMsg.createdAt,
      },
    });
  } else {
    await updateDoc(doc(db, 'chats', roomId), {
      lastMessage: null,
    });
  }
}
export default deleteLastMessage;
