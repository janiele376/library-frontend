export type RentalStatus = 'active' | 'due_soon' | 'returned' | 'overdue';

export type RentalApiStatus = 'ACTIVE' | 'DUE_SOON' | 'LATE' | 'RETURNED';

export interface RentalData {
  id: string;
  userName: string;
  cpf: string;
  bookName: string;
  bookCode: string;
  startDate: string;
  endDate: string;
  status: RentalStatus;
}

export interface RentalResponse {
  id: number;
  usersId: number;
  booksId: number;
  startDate: string;
  endDate: string;
  status: RentalApiStatus;
}

export interface RentalRequest {
  usersId: number;
  booksId: number;
}

export interface RentalUpdate {
  usersId?: number;
  booksId?: number;
}

export interface RentalsPageResponse {
  content: RentalResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export function mapRentalStatus(status: RentalApiStatus): RentalStatus {
  switch (status) {
    case 'ACTIVE':
      return 'active';

    case 'DUE_SOON':
      return 'due_soon';

    case 'LATE':
      return 'overdue';

    case 'RETURNED':
      return 'returned';
  }
}
