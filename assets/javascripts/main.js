(function(){
    var leoBirthday = new Date(document.getElementById('leo-birthday').getAttribute('data-leo-birthday'));
    var today = new Date();

    var v = CadeOLeo.Ver.v(leoBirthday, today);

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

        var dateString = $('#dateStart').datepicker('getDate').toISOString().substring(0, 10);

        var url = getUrl() + '?d=' + dateString;

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

    if (queryObj.d !== undefined) {
        if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(queryObj.d)) {
            var d = queryObj.d;
            var date = new Date(parseInt(d.substring(0,4)), parseInt(d.substring(5,7)) - 1, parseInt(d.substring(8,10)));

            $("#dateStart").datepicker("setDate", date);
            trigger();
        }
    }

    function getUrl() {
        var url = window.location.href;

        return url.indexOf('?') === -1  ? url : url.substring(0, url.indexOf('?'));
    }

})();
