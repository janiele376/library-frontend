export const publisherPatterns = {
  cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\(\d{2}\)\s9\d{4}-\d{4}$/,
};

export type ValidationResult = true | string;

export function validateName(value: string): ValidationResult {
  if (!value?.trim()) {
    return 'publishers.validation.nameRequired';
  }

  if (value.trim().length < 2) {
    return 'publishers.validation.nameMinLength';
  }

  return true;
}

export function validateCnpj(value: string): ValidationResult {
  if (!value) {
    return 'publishers.validation.cnpjRequired';
  }

  return publisherPatterns.cnpj.test(value) ? true : 'publishers.validation.cnpjInvalid';
}

export function validateEmail(value: string): ValidationResult {
  if (!value?.trim()) {
    return 'publishers.validation.emailRequired';
  }

  return publisherPatterns.email.test(value.trim()) ? true : 'publishers.validation.emailInvalid';
}

export function validatePhone(value: string): ValidationResult {
  if (!value) {
    return 'publishers.validation.phoneRequired';
  }

  return publisherPatterns.phone.test(value) ? true : 'publishers.validation.phoneInvalid';
}

export function validateAddress(value: string): ValidationResult {
  if (!value?.trim()) {
    return 'publishers.validation.addressRequired';
  }

  return value.trim().length >= 5 ? true : 'publishers.validation.addressMinLength';
}
