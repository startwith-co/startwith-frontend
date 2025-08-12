import * as ky from 'ky';
import { getMessageByCode } from '../model/backend-error-map';

type ParsedError = {
  message: string;
  status: number;
  code?: string;
};

// 상태코드별 안전한 기본 문구 (코드/메시지 둘 다 없을 때만 사용)
const FALLBACK_BY_STATUS: Record<number, string> = {
  400: '잘못된 요청입니다.',
  401: '인증에 실패했습니다.',
  403: '권한이 없습니다.',
  404: '대상을 찾을 수 없습니다.',
  409: '요청이 충돌했습니다.',
  500: '서버 오류가 발생했습니다.',
};
const getErrorDataFromKyError = async (
  error: ky.HTTPError,
): Promise<ParsedError> => {
  try {
    const json = (await error.response.json()) as {
      code?: string | number;
      message?: string;
      httpStatus?: number;
    };

    const status = json?.httpStatus || error.response.status || 500;
    const code = json?.code ? String(json.code) : undefined;

    // 1) 코드 → 한글 메시지 매핑이 있으면 그걸 우선 사용
    const mapped = getMessageByCode(code);
    if (mapped) {
      return { message: mapped, status, code };
    }

    // 2) 백엔드가 직접 보낸 message가 있으면 그걸 사용
    if (json?.message) {
      return { message: json.message, status, code };
    }

    // 3) 아무 것도 없으면 상태코드 기반 기본 메시지
    const fallback =
      FALLBACK_BY_STATUS[status] ??
      `알 수 없는 오류가 발생했습니다. (status: ${status}${code ? `, code: ${code}` : ''})`;

    return { message: fallback, status, code };
  } catch {
    // 응답이 JSON이 아니거나 파싱 실패 시
    return { message: '서버 오류가 발생했습니다.', status: 500 };
  }
};
export default getErrorDataFromKyError;
