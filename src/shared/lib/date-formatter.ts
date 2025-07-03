export default function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.')
    .replace(/\.$/, '');
}

export function formatDateTime(date: string) {
  const d = new Date(date);

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0'); // 0-indexed
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');

  return `${yyyy}.${mm}.${dd} ${hh}:${min}:${ss}`;
}

export function formatReviewTime(date: string) {
  const d = new Date(date);

  const yy = String(d.getFullYear()).slice(2); // 두 자리 연도
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');

  const ampm = hours < 12 ? 'AM' : 'PM';
  hours %= 12;
  if (hours === 0) hours = 12;
  const hh = String(hours).padStart(2, '0');

  return `${yy}.${mm}.${dd} ${ampm} ${hh}:${minutes}`;
}
