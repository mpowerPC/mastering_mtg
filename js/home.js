/*
 * File: home.js
 * 91.462 Project: Mastering Magic
 * Michael Mammosser, Computer Science Major @ UMass Lowell
 * Contact: michael_mammosser@student.uml.edu
 * Copyright (c) 2015 by Michael Mammosser.  All rights reserved.
 * Updated on April 30, 2015.
 *
 * JavaScript to start and add functionality to ScrollMagic.
 */

(function($) {
  // Initialize ScrollMagic
  var scrollmagic = new $.ScrollMagic.Controller();

  // Header transition
  new $.ScrollMagic.Scene({
    triggerElement: "#showcase .trigger", 
    triggerHook: "onLeave"
  })
  .addTo(scrollmagic)
  .on("enter leave", function(e) {
    if (e.type == "enter")
      $("header").addClass("fold")
    else {
      $("header").removeClass("fold")
    }
  });

  // Showcase Parallax
  new $.ScrollMagic.Scene({ triggerElement: '#showcase .trigger', duration: "150%" })
    .setTween("#showcase .overlay, #showcase video", { y: "500vh", ease: Linear.easeNone })
    .addTo(scrollmagic);

  // Showcase fade
  new $.ScrollMagic.Scene({ triggerElement: '#showcase .trigger', duration: "100%" })
    .setTween("#showcase .overlay .info, #showcase .controls", { opacity: 0, ease: Linear.easeNone })
    .addTo(scrollmagic);

  // Move out of the landing page when control button is clicked.
  $(".goto-content").bind("click", function() {
    var position = $("#showcase").offset().top + $("#showcase").outerHeight() - ( $("header").outerHeight() / 2 );
    $("html, body").animate({
      scrollTop: position
    }, 1600, "easeOutQuint");
  });
})(jQuery);