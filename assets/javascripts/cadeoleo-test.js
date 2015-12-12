test('CadeOLeo.Ver.v()', function() {
    deepEqual(CadeOLeo.Ver.v(new Date('2014-11-29'), new Date('2014-11-29')), 'v0.0.0', '2014-11-29__2014-11-29');

    deepEqual(CadeOLeo.Ver.v(new Date('2014-11-30'), new Date('2015-11-30')), 'v1.0.0', '2014-11-30__2015-11-30');
    deepEqual(CadeOLeo.Ver.v(new Date('2014-11-30'), new Date('2014-12-30')), 'v0.1.0', '2014-11-30__2014-12-30');
    deepEqual(CadeOLeo.Ver.v(new Date('2014-11-29'), new Date('2014-11-30')), 'v0.0.1', '2014-11-29__2014-11-30');

    deepEqual(CadeOLeo.Ver.v(new Date('2014-11-30'), new Date('2014-12-01')), 'v0.0.1', '2014-11-30__2014-12-01');
    deepEqual(CadeOLeo.Ver.v(new Date('2014-12-31'), new Date('2015-01-01')), 'v0.0.1', '2014-12-31__2015-01-01');

    deepEqual(CadeOLeo.Ver.v(new Date('2010-12-31'), new Date('2015-12-31')), 'v5.0.0', '2010-12-31__2015-12-31');

    deepEqual(CadeOLeo.Ver.v(new Date('2010-10-22'), new Date('2015-12-11')), 'v5.1.19', '2015-10-22__2015-12-11');

    deepEqual(CadeOLeo.Ver.v(new Date('2008-10-28'), new Date('2015-12-12')), 'v7.1.14', '2008-10-28__2015-12-12');

    deepEqual(CadeOLeo.Ver.v(new Date('1985-06-24'), new Date('2015-12-12')), 'v30.5.18', '1985-06-24__2015-12-12');

    deepEqual(CadeOLeo.Ver.v(new Date('1965-01-24'), new Date('2015-12-12')), 'v50.10.18', '1985-06-24__2015-12-12');
    deepEqual(CadeOLeo.Ver.v(new Date('1984-06-22'), new Date('2015-12-12')), 'v31.5.20', '1985-06-24__2015-12-12');
});
