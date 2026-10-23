export interface BookFormData {
  code: string;
  name: string;
  publisher: string;
  releaseDate: string;
  quantity: number;
}

export interface BookResponse {
  id: number;
  isbn: string;
  title: string;
  genre: string;
  releaseDate: string;
  publisherId: number;
  publisherName: string;
  quantity: number;
}

export interface CreateBookRequest {
  isbn: string;
  title: string;
  genre: string;
  releaseDate: string;
  publisherId: number;
  quantity: number;
}

export interface UpdateBookRequest {
  title?: string;
  genre?: string;
  releaseDate?: string;
  publisherId?: number;
  quantity?: number;
}

export interface UpdateBookResponse {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  publisherId: number;
  publisherName: string;
  quantity: number;
}

export interface BooksPageResponse {
  content: BookResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
