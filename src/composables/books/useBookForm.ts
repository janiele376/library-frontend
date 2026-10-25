import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { BookResponse, CreateBookRequest, UpdateBookRequest } from '@/types/books';
import type { PublisherOption } from '@/types/publishers';

type TextField = 'title' | 'isbn' | 'genre' | 'releaseDate';

interface BookFormState {
  id: number | null;
  isbn: string;
  title: string;
  genre: string;
  releaseDate: string;
  publisherId: number | null;
  quantity: number | null;
}

interface UseBookFormOptions {
  publishers: () => PublisherOption[];
}

export function useBookForm(options: UseBookFormOptions) {
  const { t } = useI18n({ useScope: 'global' });

  const emptyForm = (): BookFormState => ({
    id: null,
    isbn: '',
    title: '',
    genre: '',
    releaseDate: '',
    publisherId: null,
    quantity: 1,
  });

  const form = reactive<BookFormState>(emptyForm());
  const isEditing = ref(false);
  const filteredPublishers = ref<PublisherOption[]>([]);

  const textFields = computed<
    {
      key: TextField;
      label: string;
      type: 'text' | 'date';
    }[]
  >(() => [
    {
      key: 'title',
      label: t('books.form.name'),
      type: 'text',
    },
    {
      key: 'isbn',
      label: t('books.form.isbn'),
      type: 'text',
    },
    {
      key: 'genre',
      label: t('books.form.genre'),
      type: 'text',
    },
    {
      key: 'releaseDate',
      label: t('books.form.releaseDate'),
      type: 'date',
    },
  ]);

  const requiredRule = (value: unknown): true | string => {
    return value !== null && value !== undefined && String(value).trim() !== ''
      ? true
      : t('books.form.requiredField');
  };

  const publisherRule = (value: unknown): true | string => {
    return typeof value === 'number' ? true : t('books.form.publisherRequired');
  };

  const quantityRule = (value: unknown): true | string => {
    return typeof value === 'number' &&
      Number.isSafeInteger(value) &&
      value >= 0 &&
      value <= 2147483647
      ? true
      : t('books.form.quantityInvalid');
  };

  function filterPublishers(value: string, update: (callback: () => void) => void): void {
    update(() => {
      const search = value.trim().toLocaleLowerCase();

      filteredPublishers.value = search
        ? options
            .publishers()
            .filter((publisher) => publisher.label.toLocaleLowerCase().includes(search))
        : [...options.publishers()];
    });
  }

  function resetForm(): void {
    isEditing.value = false;
    Object.assign(form, emptyForm());
    filteredPublishers.value = [...options.publishers()];
  }

  function fillForm(book: BookResponse): void {
    resetForm();
    isEditing.value = true;
    Object.assign(form, book);
  }

  function getFormData(): CreateBookRequest | UpdateBookRequest | null {
    if (
      requiredRule(form.title) !== true ||
      requiredRule(form.isbn) !== true ||
      requiredRule(form.genre) !== true ||
      requiredRule(form.releaseDate) !== true ||
      publisherRule(form.publisherId) !== true ||
      quantityRule(form.quantity) !== true
    ) {
      return null;
    }

    if (form.publisherId === null || form.quantity === null) {
      return null;
    }

    const data = {
      title: form.title.trim(),
      genre: form.genre.trim(),
      releaseDate: form.releaseDate,
      publisherId: form.publisherId,
      quantity: Number(form.quantity),
    };

    if (isEditing.value) {
      return data;
    }

    return {
      ...data,
      isbn: form.isbn.trim(),
    };
  }

  return {
    form,
    isEditing,
    textFields,
    filteredPublishers,
    requiredRule,
    publisherRule,
    quantityRule,
    filterPublishers,
    resetForm,
    fillForm,
    getFormData,
  };
}
