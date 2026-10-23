import { api } from '@/boot/axios';

import type {
  BookResponse,
  BooksPageResponse,
  CreateBookRequest,
  UpdateBookRequest,
  UpdateBookResponse,
} from '@/types/books';

export interface GetBooksParams {
  title?: string;
  genre?: string;
  isbn?: string;
  page?: number;
  size?: number;
}

export async function getBooks(params: GetBooksParams = {}): Promise<BooksPageResponse> {
  const response = await api.get<BooksPageResponse>('/books', {
    params,
  });

  return response.data;
}

export async function getBookById(id: number): Promise<BookResponse> {
  const response = await api.get<BookResponse>(`/books/${id}`);

  return response.data;
}

export async function createBook(data: CreateBookRequest): Promise<BookResponse> {
  const response = await api.post<BookResponse>('/books', data);

  return response.data;
}

export async function updateBook(id: number, data: UpdateBookRequest): Promise<UpdateBookResponse> {
  const response = await api.put<UpdateBookResponse>(`/books/${id}`, data);

  return response.data;
}

export async function deleteBook(id: number): Promise<void> {
  await api.delete(`/books/${id}`);
}
