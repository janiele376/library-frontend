import { api } from '@/boot/axios';

import type {
  PublisherResponse,
  PublishersPageResponse,
  PublisherOption,
} from '@/types/publishers';

export type CreatePublisherDTO = Omit<PublisherResponse, 'id'>;

export type UpdatePublisherDTO = Partial<
  Pick<PublisherResponse, 'name' | 'email' | 'phone' | 'address'>
>;

export type UpdatePublisherResponse = Omit<PublisherResponse, 'cnpj'>;

export async function getPublishers(
  page = 0,
  size = 100,
  name?: string,
): Promise<PublishersPageResponse> {
  const response = await api.get<PublishersPageResponse>('/publishers', {
    params: {
      page,
      size,
      ...(name?.trim() ? { name: name.trim() } : {}),
    },
  });

  return response.data;
}

export async function getPublisherOptions(): Promise<PublisherOption[]> {
  const options: PublisherOption[] = [];
  let page = 0;

  while (true) {
    const response = await getPublishers(page);

    options.push(
      ...response.content.map((publisher: PublisherResponse) => ({
        label: publisher.name,
        value: publisher.id,
      })),
    );

    page++;

    if (page >= response.totalPages) {
      break;
    }
  }

  return options;
}

export async function getPublisherById(id: number): Promise<PublisherResponse> {
  const response = await api.get<PublisherResponse>(`/publishers/${id}`);

  return response.data;
}

// CADASTRAR EDITORA
export async function createPublisher(data: CreatePublisherDTO): Promise<PublisherResponse> {
  const response = await api.post<PublisherResponse>('/publishers', data);

  return response.data;
}

export async function updatePublisher(
  id: number,
  data: UpdatePublisherDTO,
): Promise<UpdatePublisherResponse> {
  const response = await api.put<UpdatePublisherResponse>(`/publishers/${id}`, data);

  return response.data;
}

// EXCLUIR EDITORA
export async function deletePublisher(id: number): Promise<void> {
  await api.delete(`/publishers/${id}`);
}
