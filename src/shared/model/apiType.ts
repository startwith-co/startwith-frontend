export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  code?: string;
  httpStatus: number;
}

export interface ApiErrorResponse {
  httpStatus: number;
  message: string;
  code: string;
}
