import { api } from '@/boot/axios';

import type {
  RentalRequest,
  RentalResponse,
  RentalUpdate,
  RentalsPageResponse,
} from '@/types/rentals';

export async function getRentals(
  page = 0,
  size = 5,
  userName?: string,
  bookTitle?: string,
): Promise<RentalsPageResponse> {
  const response = await api.get<RentalsPageResponse>('/rentals', {
    params: {
      page,
      size,
      ...(userName?.trim() ? { userName: userName.trim() } : {}),
      ...(bookTitle?.trim() ? { bookTitle: bookTitle.trim() } : {}),
    },
  });

  return response.data;
}

export async function getRentalById(id: number): Promise<RentalResponse> {
  const response = await api.get<RentalResponse>(`/rentals/${id}`);

  return response.data;
}

export async function createRental(data: RentalRequest): Promise<RentalResponse> {
  const response = await api.post<RentalResponse>('/rentals', data);

  return response.data;
}

export async function updateRental(id: number, data: RentalUpdate): Promise<RentalResponse> {
  const response = await api.patch<RentalResponse>(`/rentals/${id}`, data);

  return response.data;
}

export async function renewRental(id: number): Promise<RentalResponse> {
  const response = await api.put<RentalResponse>(`/rentals/${id}/renew`);

  return response.data;
}

export async function returnRental(id: number): Promise<RentalResponse> {
  const response = await api.put<RentalResponse>(`/rentals/${id}/return`);

  return response.data;
}

export async function deleteRental(id: number): Promise<void> {
  await api.delete(`/rentals/${id}`);
}
