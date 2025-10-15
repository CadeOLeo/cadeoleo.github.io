import dayjs from 'dayjs';

/**
 * Returns number of days until next birthday from now (local timezone)
 * @param {Date|string|number} birthday
 * @returns {number}
 */
export function daysUntilNextBirthday(birthday) {
  return daysUntilNextBirthdayGivenNow(birthday, new Date());
}

/**
 * Returns number of days until next birthday from a given 'now' date (local timezone)
 * @param {Date|string|number} birthday
 * @param {Date|string|number} nowMoment
 * @returns {number}
 */
export function daysUntilNextBirthdayGivenNow(birthday, nowMoment) {
  const b = dayjs(birthday).startOf('day');
  const now = dayjs(nowMoment).startOf('day');

  const thisYear = now.year();
  const birthdayThisYear = dayjs(`${thisYear}-${b.format('MM')}-${b.format('DD')}`).startOf('day');
  const birthdayNextYear = birthdayThisYear.add(1, 'year').startOf('day');

  // If today is the birthday, return 0
  if (birthdayThisYear.isSame(now)) {
    return 0;
  }
  
  // If birthday already happened this year, calculate days until next year
  const hadBirthdayThisYear = birthdayThisYear.isBefore(now);
  if (hadBirthdayThisYear) {
    return birthdayNextYear.diff(now, 'day');
  } else {
    return birthdayThisYear.diff(now, 'day');
  }
}

export default {
  daysUntilNextBirthday,
  daysUntilNextBirthdayGivenNow,
};
