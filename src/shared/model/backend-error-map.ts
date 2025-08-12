export const CODE_TO_MESSAGE = {
  // BadRequestException
  BAD_REQUEST_EXCEPTION_001: '요청 데이터 오류입니다.',
  BAD_REQUEST_EXCEPTION_003: '결제 금액이 TOSS PAYMENT 승인 금액과 다릅니다.',
  BAD_REQUEST_EXCEPTION_006: '인증코드가 일치하지 않습니다.',
  BAD_REQUEST_EXCEPTION_007: '비밀번호가 일치하지 않습니다.',
  BAD_REQUEST_EXCEPTION_008:
    '해당 결제 요청은 승인할 수 없습니다. 결제 승인 진행 중입니다.',
  BAD_REQUEST_EXCEPTION_009: '지원하지 않는 결제 수단입니다.',
  BAD_REQUEST_EXCEPTION_010: '웹훅 서명 검증에 실패했습니다.',
  BAD_REQUEST_EXCEPTION_011: 'Consumer Name이 일치하지 않습니다.',
  BAD_REQUEST_EXCEPTION_012: 'Vendor Name이 일치하지 않습니다.',

  // ConflictException
  CONFLICT_EXCEPTION_001: '중복된 이메일입니다.',
  CONFLICT_EXCEPTION_002: '동시성 저장은 불가능합니다.',
  CONFLICT_EXCEPTION_004: '해당 벤더의 해당 카테고리 솔루션이 이미 존재합니다.',
  CONFLICT_EXCEPTION_005: '같은 솔루션에 리뷰는 한 번만 작성할 수 있습니다.',
  CONFLICT_EXCEPTION_006:
    '이미 해당 결제 요청에 대한 결제 정보가 존재합니다. 새롭게 결제 요청을 진행해야합니다.',

  // NotFoundException
  NOT_FOUND_EXCEPTION_001: '존재하지 않는 벤더 기업입니다.',
  NOT_FOUND_EXCEPTION_002: '존재하지 않는 결제 요청입니다.',
  NOT_FOUND_EXCEPTION_003: '존재하지 않는 결제입니다.',
  NOT_FOUND_EXCEPTION_004: '존재하지 않는 수요 기업입니다.',
  NOT_FOUND_EXCEPTION_005: '존재하지 않는 솔루션입니다.',
  NOT_FOUND_EXCEPTION_006: '존재하지 않는 코드입니다.',
  NOT_FOUND_EXCEPTION_007: '수요 기업이 해당 솔루션에 작성한 리뷰가 없습니다.',
  NOT_FOUND_EXCEPTION_008:
    '해당 기업이 작성한 카테고리 솔루션이 존재하지 않습니다.',
  NOT_FOUND_EXCEPTION_009: '존재하지 않는 이메일 입니다.',
  NOT_FOUND_EXCEPTION_010: '전송자가 수요/벤더 기업에 존재하지 않습니다.',
  NOT_FOUND_EXCEPTION_011: '수신자가 수요/벤더 기업에 존재하지 않습니다.',
  NOT_FOUND_EXCEPTION_012: '존재하지 않는 사용자입니다.',
  NOT_FOUND_EXCEPTION_013: '존재하지 않는 채팅 Unique Type 입니다.',

  // ServerException
  SERVER_EXCEPTION_001: '내부 서버 오류가 발생했습니다.',
  SERVER_EXCEPTION_002: 'S3 업로드에 실패했습니다.',
  SERVER_EXCEPTION_003: '결제 응답 파싱 중 오류가 발생했습니다.',
  SERVER_EXCEPTION_004:
    '구매 확정, 정산 완료 결제 요청이지만 결제 승인된 정보가 없습니다.',
  SERVER_EXCEPTION_005: '중복된 결제 데이터가 존재합니다.',
  SERVER_EXCEPTION_006: '토스페이먼츠 결제 승인에 실패했습니다.',
  SERVER_EXCEPTION_007: 'WebClient 응답 에러가 발생했습니다.',
  SERVER_EXCEPTION_008: '무통장 입금 전 결제가 저장되지 않았습니다.',
  SERVER_EXCEPTION_009: '환불이 불가능한 결제입니다.',
  SERVER_EXCEPTION_010: '웹훅 처리 중 서버 오류가 발생했습니다.',

  // UnauthorizedException
  UNAUTHORIZED_EXCEPTION_001: '만료된 JWT 입니다.',
  UNAUTHORIZED_EXCEPTION_002: '잘못된 JWT 입니다.',
  UNAUTHORIZED_EXCEPTION_003: '이미 사용한 JWT 입니다.',
} as const;

export type ServerErrorCode = keyof typeof CODE_TO_MESSAGE;

export const getMessageByCode = (code?: unknown) => {
  if (!code) return undefined;
  const key = String(code).trim().toUpperCase();
  return CODE_TO_MESSAGE[key as ServerErrorCode];
};
