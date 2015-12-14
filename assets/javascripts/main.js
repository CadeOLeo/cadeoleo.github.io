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

    $('.input-group > .date').on("changeDate", function() {
        c = CadeOLeo.Ver.v(
            $('#dateStart').datepicker('getUTCDate'),
            $('#dateEnd').datepicker('getUTCDate')
        );

        if (c ==='vNaN.NaN.NaN') {
            c = 'v0.0.0';
        }

        $('#result-version').text(c);
        JqueryFlash.flash($('#result-version'));
    });

})();
