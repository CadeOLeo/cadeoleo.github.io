
describe("preciseDiffObject", function() {
    function test(d1, d2, result) {
        expect(moment.preciseDiffObject(moment(d1, 'YYYY-MM-DD HH:mm:ss'), moment(d2, 'YYYY-MM-DD HH:mm:ss'))).toEqual(result);
    }

    describe("order", function() {
        it("same date", function() {
            test('2013-01-01 00:00:00', '2013-01-01 00:00:00', {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });

        it("first date after second", function() {
            test('2013-01-01 00:00:01', '2013-01-01 00:00:00', {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 1
            });
        });

        it("second date after first", function() {
            test('2013-01-01 00:00:00', '2013-01-01 00:00:01', {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 1
            });
        });
    });

    describe("single/plural", function() {
        it("multiple seconds", function() {
            test('2013-01-01 00:00:00', '2013-01-01 00:00:02', {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 2
            });
        });

        it("one minute", function() {
            test('2013-01-01 00:00:00', '2013-01-01 00:01:00', {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 1,
                seconds: 0
            });
        });

        it("multiple minutes", function() {
            test('2013-01-01 00:00:00', '2013-01-01 00:02:00', {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 2,
                seconds: 0
            });
        });

        it("one hour", function() {
            test('2013-01-01 00:00:00', '2013-01-01 01:00:00', {
                years: 0,
                months: 0,
                days: 0,
                hours: 1,
                minutes: 0,
                seconds: 0
            });
        });

        it("multiple hours", function() {
            test('2013-01-01 00:00:00', '2013-01-01 02:00:00', {
                years: 0,
                months: 0,
                days: 0,
                hours: 2,
                minutes: 0,
                seconds: 0
            });
        });

        it("one day", function() {
            test('2013-01-01 00:00:00', '2013-01-02 00:00:00', {
                years: 0,
                months: 0,
                days: 1,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });

        it("multiple days", function() {
            test('2013-01-01 00:00:00', '2013-01-03 00:00:00', {
                years: 0,
                months: 0,
                days: 2,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });

        it("one month", function() {
            test('2013-01-01 00:00:00', '2013-02-01 00:00:00', {
                years: 0,
                months: 1,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });

        it("multiple months", function() {
            test('2013-01-01 00:00:00', '2013-03-01 00:00:00', {
                years: 0,
                months: 2,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });

        it("one year", function() {
            test('2013-01-01 00:00:00', '2014-01-01 00:00:00', {
                years: 1,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });

        it("multiple years", function() {
            test('2013-01-01 00:00:00', '2015-01-01 00:00:00', {
                years: 2,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });
    });

    describe("counting back", function() {
        it("seconds", function() {
            test('2013-01-01 00:02:10', '2013-01-01 00:03:05', {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 55
            });
        });
        it("minutes", function() {
            test('2013-01-01 02:10:00', '2013-01-01 03:05:00', {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 55,
                seconds: 0
            });
        });
        it("hours", function() {
            test('2013-01-01 23:00:00', '2013-01-02 01:00:00', {
                years: 0,
                months: 0,
                days: 0,
                hours: 2,
                minutes: 0,
                seconds: 0
            });
        });
        it("days", function() {
            test('2013-01-20 00:00:00', '2013-02-10 00:00:00', {
                years: 0,
                months: 0,
                days: 21,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });
        it("months", function() {
            test('2013-11-01 00:00:00', '2014-02-01 00:00:00', {
                years: 0,
                months: 3,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });
    });

    describe("days across month boundaries", function() {
        it("start month has more days than last full month", function() {
            test('2013-01-31 00:00:00', '2013-03-01 00:00:00', {
                years: 0,
                months: 1,
                days: 1,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            test('2013-01-30 00:00:00', '2013-03-01 00:00:00', {
                years: 0,
                months: 1,
                days: 1,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            test('2013-01-29 00:00:00', '2013-03-01 00:00:00', {
                years: 0,
                months: 1,
                days: 1,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            test('2013-01-28 00:00:00', '2013-03-01 00:00:00', {
                years: 0,
                months: 1,
                days: 1,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            test('2013-01-27 00:00:00', '2013-03-01 00:00:00', {
                years: 0,
                months: 1,
                days: 2,
                hours: 0,
                minutes: 0,
                seconds: 0
            });

            test('2013-05-31 00:00:00', '2013-07-01 00:00:00', {
                years: 0,
                months: 1,
                days: 1,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            test('2013-05-30 00:00:00', '2013-07-01 00:00:00', {
                years: 0,
                months: 1,
                days: 1,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            test('2013-05-29 00:00:00', '2013-07-01 00:00:00', {
                years: 0,
                months: 1,
                days: 2,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });
        it("start month has fewer days than last full month", function() {
            test('2013-04-29 00:00:00', '2013-08-01 00:00:00', {
                years: 0,
                months: 3,
                days: 3,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            test('2013-04-30 00:00:00', '2013-08-01 00:00:00', {
                years: 0,
                months: 3,
                days: 2,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            // no way to get '3 months 1 day' to 2013-08-01
        });
        it("start month has same days as last full month", function() {
            test('2013-05-30 00:00:00', '2013-08-01 00:00:00', {
                years: 0,
                months: 2,
                days: 2,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            test('2013-05-31 00:00:00', '2013-08-01 00:00:00', {
                years: 0,
                months: 2,
                days: 1,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });
    });

    describe("combinations", function() {
        it("all values", function() {
            test('2001-11-12 13:01:43', '2014-02-01 01:03:01', {
                years: 12,
                months: 2,
                days: 19,
                hours: 12,
                minutes: 1,
                seconds: 18
            });
        });
        it("multiple values", function() {
            test('2013-10-21 10:15:40', '2014-02-02 01:01:01', {
                years: 0,
                months: 3,
                days: 11,
                hours: 14,
                minutes: 45,
                seconds: 21
            });
            test('2013-12-31 23:58:10', '2014-01-01 00:02:08', {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 3,
                seconds: 58
            });
            test('2013-12-31 04:08:20', '2014-01-01 01:02:03', {
                years: 0,
                months: 0,
                days: 0,
                hours: 20,
                minutes: 53,
                seconds: 43
            });
            test('2013-12-27 05:10:20', '2014-01-02 06:12:30', {
                years: 0,
                months: 0,
                days: 6,
                hours: 1,
                minutes: 2,
                seconds: 10
            });
            test('2013-10-21 10:15:40', '2014-02-02 01:01:01', {
                years: 0,
                months: 3,
                days: 11,
                hours: 14,
                minutes: 45,
                seconds: 21
            });
            test('2013-11-02 01:00:40', '2014-02-02 01:01:01', {
                years: 0,
                months: 3,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 21
            });
        });
    });
});
