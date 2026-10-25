import { api } from '@/boot/axios';

import type {
  UserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  AdminUpdateUserRequest,
} from '@/types/user';

export interface UserPage {
  content: UserResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface UserSearchParams {
  nameCompleted?: string;
  email?: string;
  cpf?: string;
  page?: number;
  size?: number;
}

export async function getMyProfile(): Promise<UserResponse> {
  const response = await api.get<UserResponse>('/users/me');

  return response.data;
}

export async function updateMyProfile(data: UpdateUserRequest): Promise<UpdateUserResponse> {
  const response = await api.put<UpdateUserResponse>('/users/me', data);

  return response.data;
}

export async function getUsers(params: UserSearchParams = {}): Promise<UserPage> {
  const response = await api.get<UserPage>('/users', {
    params,
  });

  return response.data;
}

export async function getUserById(id: number): Promise<UserResponse> {
  const response = await api.get<UserResponse>(`/users/${id}`);

  return response.data;
}

export async function adminUpdateUser(
  id: number,
  data: AdminUpdateUserRequest,
): Promise<UserResponse> {
  const response = await api.put<UserResponse>(`/users/${id}`, data);

  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
}
