import * as ky from 'ky';

type ErrorCodeType = {
  [key: string]: { code: string; message: string; status: number };
};

export const ERROR_CODE: ErrorCodeType = {
  default: {
    code: 'ERROR',
    message: '알 수 없는 오류가 발생했습니다.',
    status: 500,
  },

  ERR_NETWORK: {
    code: '통신 에러',
    message:
      '서버가 응답하지 않습니다.\n프로그램을 재시작하거나 관리자에게 연락하세요.',
    status: 500,
  },
  ECONNABORTED: {
    code: '요청 시간 초과',
    message: '요청 시간을 초과했습니다.',
    status: 500,
  },

  400: { code: '400', message: '잘못된 요청.', status: 400 },
  4001: {
    code: '4001',
    message: '요청에 대한 Validation 에러입니다.',
    status: 4001,
  },
  401: { code: '401', message: '인증 에러.', status: 401 },
  4011: { code: '4011', message: '인증이 만료되었습니다.', status: 4011 },
  403: { code: '403', message: '권한이 없습니다.', status: 403 },
} as const;

export const getErrorDataFromKyError = async (error: ky.HTTPError) => {
  try {
    const json = (await error.response.json()) as {
      code?: string | number;
      message?: string;
      status?: number;
    };

    const serverErrorCode = json?.code;
    const httpStatusCode = error.response.status;
    const errorCode = serverErrorCode || httpStatusCode;

    if (errorCode in ERROR_CODE) {
      return ERROR_CODE[errorCode];
    }
    return {
      code: errorCode.toString(),
      message: error.message,
      status: httpStatusCode,
    };
  } catch (e) {
    return ERROR_CODE.default;
  }
};
