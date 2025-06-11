import { Timestamp } from 'firebase/firestore';

function formatTime(timestamp: Timestamp | null | undefined) {
  if (!timestamp) return '';
  const date = timestamp.toDate(); // Date 객체로 변환
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // 예: PM 03:07
}

export default formatTime;
