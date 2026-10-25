export interface UserResponse {
  id: number;
  nameCompleted: string;
  email: string;
  phone: string;
  cpf: string;
  dateBirth: string;
  address: string;
}

export interface UpdateUserRequest {
  nameCompleted: string | null;
  email: string | null;
  address: string | null;
  phone: string | null;
  password: string | null;
  currentPassword: string;
}

export interface UpdateUserResponse {
  id: number;
  nameCompleted: string;
  email: string;
  phone: string;
  address: string;
}

export interface AdminUpdateUserRequest {
  nameCompleted?: string;
  email?: string;
  phone?: string;
  cpf?: string;
  address?: string;
  dateBirth?: string;
}
