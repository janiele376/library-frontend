import { api } from '@/boot/axios';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
} from '@/types/auth';

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', data);

  return response.data;
}

export async function register(data: RegisterRequest): Promise<void> {
  await api.post('/auth/register', data);
}

export async function forgotPassword(data: ForgotPasswordRequest): Promise<void> {
  await api.post('/auth/forgot-password', data);
}
