import { faker } from '@faker-js/faker';

export function generateEmail(): string {
  const email = faker.internet.email();

  return email.toLowerCase();
}

export function generatePassword(
  options: {
    length?: number;
    memorable?: boolean;
    pattern?: RegExp;
    prefix?: string;
  } = {},
): string {
  const { length, memorable, pattern, prefix } = options;

  const password = faker.internet.password({
    length,
    memorable,
    pattern,
    prefix,
  });

  return password;
}

export function generateNumber(options: {
  min?: number;
  max?: number;
} = {}): number {
  const { min = 0, max = 100 } = options;
  const number = faker.number.int({
    min,
    max,
  })

  return number;
}
