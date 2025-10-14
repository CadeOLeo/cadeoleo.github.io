import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function ver(startDate, endDate) {
    const start = dayjs.utc(startDate);
    const end = dayjs.utc(endDate);

    const years = end.diff(start, 'year');
    const months = end.diff(start, 'month') % 12;
    const days = end.diff(start.add(years, 'year').add(months, 'month'), 'day');

    return `v${years}.${months}.${days}`;
}
