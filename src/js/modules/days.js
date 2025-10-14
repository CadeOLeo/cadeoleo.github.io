import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * Returns number of days until next birthday from now (UTC)
 * @param {Date|string|number} birthday
 * @returns {number}
 */
export function daysUntilNextBirthday(birthday) {
  return daysUntilNextBirthdayGivenNow(birthday, new Date());
}

/**
 * Returns number of days until next birthday from a given 'now' date (UTC)
 * @param {Date|string|number} birthday
 * @param {Date|string|number} nowMoment
 * @returns {number}
 */
export function daysUntilNextBirthdayGivenNow(birthday, nowMoment) {
  const b = dayjs.utc(birthday).startOf('day');
  const now = dayjs.utc(nowMoment).startOf('day');

  const thisYear = now.year();
  const birthdayThisYear = dayjs.utc(`${thisYear}-${b.format('MM')}-${b.format('DD')}`).startOf('day');
  const birthdayNextYear = birthdayThisYear.add(1, 'year').startOf('day');

  const hadBirthdayThisYear = birthdayThisYear.isBefore(now) || birthdayThisYear.isSame(now);
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
