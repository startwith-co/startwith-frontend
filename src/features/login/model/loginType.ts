export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthData {
  vendorSeq: any;
  consumerSeq: number;
  accessToken: string;
  refreshToken: string;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export type LoginResponse = ApiResponse<AuthData>;
