import dayjs from 'dayjs';

export function ver(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    const years = end.diff(start, 'year');
    const months = end.diff(start, 'month') % 12;
    const days = end.diff(start.add(years, 'year').add(months, 'month'), 'day');

    return `v${years}.${months}.${days}`;
}
