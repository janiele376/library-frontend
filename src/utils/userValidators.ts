export function isValidFullName(value: string): boolean {
  const name = value.trim();

  return name.length >= 3 && name.length <= 150 && /^[a-zA-ZÀ-ÿ]+(?:\s+[a-zA-ZÀ-ÿ]+)+$/.test(name);
}

export function isValidEmail(value: string): boolean {
  const email = value.trim();

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(value: string): boolean {
  const phone = value.trim();

  return /^\(\d{2}\)\s9\d{4}-\d{4}$/.test(phone);
}

export function isValidAddress(value: string): boolean {
  return value.trim().length > 0;
}
