import { MIN_ANNUAL_SALARY_USD } from '@/common/constants/candidateInfo.constants';
import { generateNumber } from '@/common/helpers/testDataGenerators.helpers';

export function generateSalaryRange(
  min = MIN_ANNUAL_SALARY_USD,
  max = MIN_ANNUAL_SALARY_USD * 2,
): number {
  return generateNumber({
    min,
    max,
  });
}
