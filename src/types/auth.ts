export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  nameCompleted: string;
  dateBirth: string;
  email: string;
  cpf: string;
  phone: string;
  address: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
  cpf: string;
  newPassword: string;
  confirmPassword: string;
}
