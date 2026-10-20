export interface DashboardRental {
  rentalId: number;
  bookId: number;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface DashboardBook {
  bookId: number;
  title: string;
  quantity: number;
}

export interface DashboardPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface MostRentedBook {
  bookId: number;
  title: string;
  publisher: string | null;
  releaseDate: string | null;
  quantity: number;
}

export interface AdminDashboardResponse {
  onTimeRentals: number;
  nearDueRentals: number;
  overdueRentals: number;
  lastRentals: DashboardRental[];
  totalRentals: number;
  totalBooks: number;
  totalPublishers: number;
  mostRentedBook: MostRentedBook | null;
  availableBooks: DashboardPage<DashboardBook>;
  activeRentalsByBook: Record<string, number>;
}
