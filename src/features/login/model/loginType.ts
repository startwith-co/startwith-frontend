export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthData {
  vendorSeq: number;
  consumerSeq: number;
  accessToken: string;
  refreshToken: string;
  consumerUniqueType: string;
  consumerName: string;
  vendorUniqueType: string;
  vendorName: string;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export type LoginResponse = ApiResponse<AuthData>;
