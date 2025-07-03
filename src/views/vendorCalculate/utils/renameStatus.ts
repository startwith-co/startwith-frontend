export default function renameStatus(status: string) {
  switch (status) {
    case 'CONFIRMED':
      return '정산 완료';
    case 'DONE':
      return '정산 대기';
    case 'SETTLED':
      return '정산 완료';
    default:
      return status;
  }
}
