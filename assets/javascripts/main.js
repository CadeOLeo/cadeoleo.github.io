(function(){
    var leoBirthday = new Date(document.getElementById('leo-birthday').getAttribute('data-leo-birthday'));
    var today = new Date();

    var v = CadeOLeo.Ver.v(leoBirthday, today);

    document.getElementById('leo-version').innerText = v;
})();
