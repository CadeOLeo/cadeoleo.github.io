(function(moment) {
    var DIFFERENCE = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    moment.fn.preciseDiffObject = function(d2) {
        return moment.preciseDiff(this, d2);
    };
    moment.preciseDiffObject = function(d1, d2) {
        var m1 = moment(d1), m2 = moment(d2);
        if (m1.isSame(m2)) {
            return DIFFERENCE;
        }
        if (m1.isAfter(m2)) {
            var tmp = m1;
            m1 = m2;
            m2 = tmp;
        }

        var yDiff = m2.year() - m1.year();
        var mDiff = m2.month() - m1.month();
        var dDiff = m2.date() - m1.date();
        var hourDiff = m2.hour() - m1.hour();
        var minDiff = m2.minute() - m1.minute();
        var secDiff = m2.second() - m1.second();

        if (secDiff < 0) {
            secDiff = 60 + secDiff;
            minDiff--;
        }
        if (minDiff < 0) {
            minDiff = 60 + minDiff;
            hourDiff--;
        }
        if (hourDiff < 0) {
            hourDiff = 24 + hourDiff;
            dDiff--;
        }
        if (dDiff < 0) {
            var daysInLastFullMonth = moment(m2.year() + '-' + (m2.month() + 1), "YYYY-MM").subtract(1, 'M').daysInMonth();
            if (daysInLastFullMonth < m1.date()) { // 31/01 -> 2/03
                dDiff = daysInLastFullMonth + dDiff + (m1.date() - daysInLastFullMonth);
            } else {
                dDiff = daysInLastFullMonth + dDiff;
            }
            mDiff--;
        }
        if (mDiff < 0) {
            mDiff = 12 + mDiff;
            yDiff--;
        }

        return {
            years: yDiff,
            months: mDiff,
            days: dDiff,
            hours: hourDiff,
            minutes: minDiff,
            seconds: secDiff
        };
    };
}(moment));
