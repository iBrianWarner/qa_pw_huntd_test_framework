import {
  MAX_ANNUAL_SALARY_USD,
  MIN_ANNUAL_SALARY_USD,
} from '@/common/constants/candidateInfo.constants';
import { generateNumber } from '@/common/helpers/testDataGenerators.helpers';

export function generateSalaryRange(
  min = MIN_ANNUAL_SALARY_USD,
  max = MAX_ANNUAL_SALARY_USD,
): number {
  return generateNumber({
    min,
    max,
  });
}
