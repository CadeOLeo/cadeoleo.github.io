(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        // Node / CommonJS
        module.exports = factory(require('moment'));
    } else {
        // Browser global
        root.CadeOLeoDays = factory(root.moment);
    }
}(this, function (moment) {

    function daysUntilNextBirthday(birthday) {
        return daysUntilNextBirthdayGivenNow(birthday, moment.utc());
    }

    function daysUntilNextBirthdayGivenNow(birthday, nowMoment) {
        var b = moment.utc(birthday).startOf('day');

        var now = moment.utc(nowMoment).startOf('day');

        var thisYear = now.year();

        var birthdayThisYear = moment.utc(thisYear + '-' + b.format('MM') + '-' + b.format('DD'), 'YYYY-MM-DD').startOf('day');
        var birthdayNextYear = moment.utc(birthdayThisYear).add(1, 'year').startOf('day');

        var hadBirthdayThisYear = birthdayThisYear.isBefore(now);

        var daysUntilNextBirthday = 0;

        if (hadBirthdayThisYear) {
            daysUntilNextBirthday = birthdayNextYear.diff(now, 'days');
        } else {
            daysUntilNextBirthday = birthdayThisYear.diff(now, 'days');
        }

        return daysUntilNextBirthday;
    }

    return {
        daysUntilNextBirthday: daysUntilNextBirthday,
        daysUntilNextBirthdayGivenNow: daysUntilNextBirthdayGivenNow
    };

}));
