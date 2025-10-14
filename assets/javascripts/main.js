(function(){
    var leoBirthday = new Date(document.getElementById('leo-birthday').getAttribute('data-leo-birthday'));

    // Use shared days helper (CadeOLeoDays). Support require() in environments that have it.
    var DaysHelper = (typeof require === 'function') ? require('./lib/days') : (window.CadeOLeoDays || {});

    var leoDaysUntilNextBirthday = 0;
    if (DaysHelper && typeof DaysHelper.daysUntilNextBirthday === 'function') {
        leoDaysUntilNextBirthday = DaysHelper.daysUntilNextBirthday(leoBirthday);
    } else if (window.CadeOLeoDays && typeof window.CadeOLeoDays.daysUntilNextBirthday === 'function') {
        leoDaysUntilNextBirthday = window.CadeOLeoDays.daysUntilNextBirthday(leoBirthday);
    }

    var today = new Date();

    var v = CadeOLeo.Ver.v(leoBirthday, today);

    // console.log({leoBirthday});
    // console.log({leoDaysUntilNextBirthday});
    // console.log({today});
    // console.log({v});

    document.getElementById('leo-version').innerText = v;

    var languageDatepicker = "en";
    if (window.location.pathname !== '/index_en.html') {
        languageDatepicker = "pt-BR";
    }

    $('.input-group > .date').datepicker({
        language: languageDatepicker,
        todayHighlight: true,
        autoclose: true,
        disableTouchKeyboard: true,
        immediateUpdates: true,
        todayBtn: 'linked'
    });

    $("#dateEnd").datepicker("setDate", today);

    var messageDaysUntil = {
        "pt-BR": {
            "title": "Quanto falta?",
            "content": [
                "Faltam",
                "dias",
                "pro niver do Léo!"
            ]
        },
        "en": {
            "title": "How many days?",
            "content": [
                "There are",
                "days",
                "until Léo's birthday!"
            ]
        }
    }

    $(function () {

        var content = '<div class="container">' +
                            '<div class="row text-center">' +
                                '<p style="font-size: 1em;">' + messageDaysUntil[languageDatepicker].content[0] + '</p>' +
                                '<p style="font-size: 1.5em;">⏳🎊&nbsp;<span id="leo-days-until" style="font-size: 2em;">'+ leoDaysUntilNextBirthday +'</span>&nbsp;⏳🎊</p>' +
                                '<p style="font-size: 1.5em;">' + messageDaysUntil[languageDatepicker].content[1] + '</p>' +
                                '<p style="font-size: 1em;">' + messageDaysUntil[languageDatepicker].content[2] + '</p>' +
                            ' </div>' +
                    ' </div>';


        $('[data-toggle="popover"]').popover({
            trigger: 'focus',
            html: true,
            title: '<p class="text-center" style="padding: 0; margin: 0;">🎂🎈🎉' + messageDaysUntil[languageDatepicker].title + '🎂🎈🎉</p>',
            content: content,
            placement: 'bottom',
            delay: {
                show: 200,
                hide: 0
            },
            toggle: 'popover'
        });

    });

    function trigger() {
        c = CadeOLeo.Ver.v(
            $('#dateStart').datepicker('getUTCDate'),
            $('#dateEnd').datepicker('getUTCDate')
        );

        if (c ==='vNaN.NaN.NaN') {
            c = 'v0.0.0';
        }

        $('#result-version').text(c);
        JqueryFlash.flash($('#result-version'));

        var dateStartString = $('#dateStart').datepicker('getDate').toISOString().substring(0, 10);
        var dateEndString = $('#dateEnd').datepicker('getDate').toISOString().substring(0, 10);

        var url = getUrl() + '?d1=' + dateStartString
                           + '&d2=' + dateEndString;

        var description = languageDatepicker != 'en' ?
            'Minha versão é ' + c + ' #CadeOLeo' :
            'My version is ' + c + ' #CadeOLeo';
        var buttonText = languageDatepicker != 'en' ?
            'Compartilhar' :
            'Share';

        var share = new ShareButton({
          url: url,
          title: 'CadeOLeo',
          description: description,
          ui: {
            buttonText: buttonText
          },
          networks: {
            pinterest: {
              enabled: false
            },
            reddit: {
              enabled: false
            },
            linkedin: {
              enabled: false
            },
            email: {
              enabled: false
            }
          }
        });

        share.open();

        $('.this-share-button').show();
    }

    $('.input-group > .date').on("changeDate", trigger);

    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    var queryObj = getUrlVars();

    if (queryObj.d1 !== undefined) {
        if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(queryObj.d1)) {
            var d = queryObj.d1;
            var date = new Date(parseInt(d.substring(0,4)), parseInt(d.substring(5,7)) - 1, parseInt(d.substring(8,10)));

            $("#dateStart").datepicker("setDate", date);
            trigger();
        }
    }

    if (queryObj.d2 !== undefined) {
        if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(queryObj.d2)) {
            var d = queryObj.d2;
            var date = new Date(parseInt(d.substring(0,4)), parseInt(d.substring(5,7)) - 1, parseInt(d.substring(8,10)));

            $("#dateEnd").datepicker("setDate", date);
            trigger();
        }
    }

    function getUrl() {
        var url = window.location.href;

        return url.indexOf('?') === -1  ? url : url.substring(0, url.indexOf('?'));
    }

})();
