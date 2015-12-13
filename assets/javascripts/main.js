(function(){
    var leoBirthday = new Date(document.getElementById('leo-birthday').getAttribute('data-leo-birthday'));
    var today = new Date();

    var v = CadeOLeo.Ver.v(leoBirthday, today);

    document.getElementById('leo-version').innerText = v;

    var language = "en";
    if (window.location.pathname !== '/index_en.html') {
        language = "pt-BR";
    }

    $('.input-group > .date').datepicker({
        language: language,
        todayHighlight: true,
        autoclose: true,
        disableTouchKeyboard: true,
        immediateUpdates: true
    });

    $("#dateEnd").datepicker("setDate", new Date());

    $('.input-group > .date').on("changeDate", function() {
        c = CadeOLeo.Ver.v(
            $('#dateStart').datepicker('getUTCDate'),
            $('#dateEnd').datepicker('getUTCDate')
        );

        if (c ==='vNaN.NaN.NaN') {
            c = 'v0.0.0';
        }

        document.getElementById('result-version').innerText = c;
    });

})();
