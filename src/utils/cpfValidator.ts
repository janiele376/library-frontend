export function isValidCPF(value: string): boolean {
  const cpf = value.replace(/\D/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  for (let digit = 9; digit < 11; digit++) {
    let sum = 0;

    for (let index = 0; index < digit; index++) {
      sum += Number(cpf[index]) * (digit + 1 - index);
    }

    const remainder = (sum * 10) % 11;
    const expected = remainder === 10 ? 0 : remainder;

    if (expected !== Number(cpf[digit])) {
      return false;
    }
  }

  return true;
}
