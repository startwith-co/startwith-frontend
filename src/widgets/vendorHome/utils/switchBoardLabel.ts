export default function switchBoardLabel(label: string) {
  switch (label) {
    case '구매확정':
      return 'CONFIRMED';
    case '정산완료':
      return 'DONE';
    case '정산대기':
      return 'SETTLED';
    default:
      return label;
  }
}
