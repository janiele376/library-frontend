export interface PublisherFormData {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
}

export interface PublisherResponse {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
}

export interface PublishersPageResponse {
  content: PublisherResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface PublisherOption {
  label: string;
  value: number;
}
