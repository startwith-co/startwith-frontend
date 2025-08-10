import * as ky from 'ky';

type ErrorCodeType = {
  [key: string]: { message: string; status: number };
};

export const ERROR_CODE: ErrorCodeType = {
  500: { message: '서버 오류가 발생했습니다.', status: 500 },

  400: { message: '잘못된 요청입니다.', status: 400 },
  4001: {
    message: '요청에 대한 Validation 에러입니다.',
    status: 4001,
  },
  401: { message: '인증 에러.', status: 401 },
  4011: { message: '인증이 만료되었습니다.', status: 4011 },
  403: { message: '권한이 없습니다.', status: 403 },
  409: { message: '이미 등록된 솔루션입니다.', status: 409 },
  404: { message: '해당 데이터를 찾을 수 없습니다.', status: 404 },
} as const;

export const getErrorDataFromKyError = async (error: ky.HTTPError) => {
  try {
    const json = (await error.response.json()) as {
      code?: string | number;
      message?: string;
      httpStatus?: number;
    };
    console.log('에러 메시지', error.message);

    const httpStatusCode = json?.httpStatus || 500;

    if (json?.message) {
      return {
        message: json.message,
        status: httpStatusCode,
      };
    }

    if (httpStatusCode in ERROR_CODE) {
      return ERROR_CODE[httpStatusCode];
    }
    return {
      message: error.message,
      status: httpStatusCode,
    };
  } catch (e) {
    return ERROR_CODE[500];
  }
};
