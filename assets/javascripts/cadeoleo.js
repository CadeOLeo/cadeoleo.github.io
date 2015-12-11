var CadeOLeo = CadeOLeo || {};

CadeOLeo.Ver = (function() {

    function v(dateStart, dateEnd) {

        var years = 0, months = 0, days = 0;

        if (
            (dateStart.getUTCMonth() === dateEnd.getUTCMonth()) &&
            (dateStart.getUTCDate() === dateEnd.getUTCDate())
        ) {
            years = dateEnd.getUTCFullYear() - dateStart.getUTCFullYear();
            return 'v' + years + '.' + months + '.' + days;
        }

        if (
            (dateStart.getUTCFullYear() === dateEnd.getUTCFullYear()) &&
            (dateStart.getUTCDate() === dateEnd.getUTCDate())
        ) {
            months = dateEnd.getUTCMonth() - dateStart.getUTCMonth();
            return 'v' + years + '.' + months + '.' + days;
        }

        if (
            (dateStart.getUTCFullYear() === dateEnd.getUTCFullYear()) &&
            (dateStart.getUTCMonth() === dateEnd.getUTCMonth())
        ) {
            days = dateEnd.getUTCDate() - dateStart.getUTCDate();
            return 'v' + years + '.' + months + '.' + days;
        }

        var a = moment.utc(dateEnd);
        var b = moment.utc(dateStart);
        years = a.diff(b, 'years');
        months = a.diff(b, 'months');
        days = a.diff(b, 'days');

        return 'v' + years + '.' + months + '.' + days;
    }

    return {
        v: v
    };

})();
