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

  return faker.internet.password({
    length,
    memorable,
    pattern,
    prefix,
  });
}

export function generateNumber(
  options: {
    min?: number;
    max?: number;
  } = {},
): number {
  const { min = 0, max = 100 } = options;

  return faker.number.int({
    min,
    max,
  });
}

export function generateStringByLength(
  options: {
    length?: number;
  } = {},
): string {
  const { length } = options;

  return faker.string.alpha({
    length,
  });
}

export function generatePhrase(wordCount = 3): string {
  return faker.lorem.sentence(wordCount);
}

export function generateParagraph(sentenceCount = 3): string {
  return faker.lorem.paragraph(sentenceCount);
}

export function generateFirstName(): string {
  return faker.person.firstName();
}

export function generateLastName(): string {
  return faker.person.lastName();
}
