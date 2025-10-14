import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { daysUntilNextBirthday, daysUntilNextBirthdayGivenNow } from '../src/js/modules/days';

dayjs.extend(utc);

describe('Dias até o próximo aniversário', () => {
  it('deve calcular corretamente os dias até o próximo aniversário', () => {
    const birthday = new Date('2015-10-22');
    const today = new Date('2025-10-14');
    const days = daysUntilNextBirthday(birthday);
    expect(days).toBeGreaterThan(0);
    expect(days).toBeLessThanOrEqual(365);
  });

  it('deve calcular 8 dias até o aniversário em 14/10/2025', () => {
    const birthday = new Date('2015-10-22');
    const today = new Date('2025-10-14');
    const days = daysUntilNextBirthdayGivenNow(birthday, today);
    expect(days).toBe(8);
  });

  it('deve calcular 364 dias após o aniversário', () => {
    const birthday = new Date('2015-10-22');
    const dayAfterBirthday = new Date('2025-10-23');
    const days = daysUntilNextBirthdayGivenNow(birthday, dayAfterBirthday);
    expect(days).toBe(364);
  });
});
