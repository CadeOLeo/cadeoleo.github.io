var assert = require('assert');
var days = require('../assets/javascripts/lib/days');
var moment = require('moment');

describe('daysUntilNextBirthday', function() {
  it('should return 9 days for now=2025-10-13 and birthday=2015-10-22', function() {
    var now = moment.utc('2025-10-13', 'YYYY-MM-DD');
    var birthday = '2015-10-22';

    var result = days.daysUntilNextBirthdayGivenNow(birthday, now);

    assert.strictEqual(result, 9);
  });

  it('should return 0 when today is the birthday', function() {
    var now = moment.utc('2025-10-22', 'YYYY-MM-DD');
    var birthday = '2015-10-22';

    var result = days.daysUntilNextBirthdayGivenNow(birthday, now);

    assert.strictEqual(result, 0);
  });

  it('should count into next year when birthday already passed', function() {
    var now = moment.utc('2025-10-23', 'YYYY-MM-DD');
    var birthday = '2015-10-22';

    var result = days.daysUntilNextBirthdayGivenNow(birthday, now);

    // next birthday is 2026-10-22; calculate days between 2025-10-23 and 2026-10-22
    var expected = moment.utc('2026-10-22', 'YYYY-MM-DD').diff(moment.utc('2025-10-23', 'YYYY-MM-DD'), 'days');

    assert.strictEqual(result, expected);
  });

});
