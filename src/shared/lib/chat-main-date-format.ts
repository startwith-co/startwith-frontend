import { Timestamp } from 'firebase/firestore';

function formatMainDate(timestamp: Timestamp | null | undefined) {
  if (!timestamp) return '';
  const date = timestamp.toDate(); // Date 객체로 변환

  const year = String(date.getFullYear()).slice(2); // 뒤 2자리
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 1~12
  const day = String(date.getDate()).padStart(2, '0'); // 1~31

  return `${year}.${month}.${day}`; // 예: 25.07.01
}

export default formatMainDate;
