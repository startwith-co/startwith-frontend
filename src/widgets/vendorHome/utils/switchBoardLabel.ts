export default function switchBoardLabel(label: string) {
  switch (label) {
    case '구매 확정':
      return 'CONFIRMED';
    case '정산 대기':
      return 'DONE';
    case '정산 완료':
      return 'SETTLED';
    default:
      return label;
  }
}
