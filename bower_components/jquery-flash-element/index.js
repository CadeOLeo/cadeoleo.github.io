// http://stackoverflow.com/a/28980225/1330750
var JqueryFlash = (function() {
  var flash = function(elements) {
    var opacity = 100;
    var color = "255, 255, 20" // has to be in this format since we use rgba
    var interval = setInterval(function() {
      opacity -= 3;
      if (opacity <= 0) clearInterval(interval);
      $(elements).css({background: "rgba("+color+", "+opacity/100+")"});
    }, 30);
  };

  return {
    flash: flash
  };

})();
