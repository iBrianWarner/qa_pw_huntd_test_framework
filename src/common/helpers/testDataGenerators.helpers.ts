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
