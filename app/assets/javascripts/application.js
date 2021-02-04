/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

// Adds active class to meny based on page

$(function() {
  var loc = window.location.href; // returns the full URL
  var origin   = window.location.origin;  // returns origin
  if(loc === origin + '/v2') {
    $('#home').addClass('govuk-header__navigation-item--active');
  } 
  if(loc === origin + '/v3') {
    $('#home').addClass('govuk-header__navigation-item--active');
  } 
  if(/case-studies/.test(loc)) {
    $('#case-studies').addClass('govuk-header__navigation-item--active');
  }
  if (/about/.test(loc)) {
    $('#about').addClass('govuk-header__navigation-item--active');
  }
});

// Sticky sidebar

$( document ).ready(function() {

  var $sticky = $('.case-study-navigation');
  var $stickyrStopper = $('.govuk-footer');
  if (!!$sticky.offset()) { // make sure ".sticky" element exists

    var generalSidebarHeight = $sticky.innerHeight();
    var stickyTop = $sticky.offset().top;
    var stickOffset = 100;
    var stickyStopperPosition = $stickyrStopper.offset().top;
    var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
    var diff = stopPoint + stickOffset;

    $(window).scroll(function(){ // scroll event
      var windowTop = $(window).scrollTop(); // returns number

      if (stopPoint < windowTop) {
          $sticky.css({ position: 'absolute', top: diff });
      } else if (stickyTop < windowTop+stickOffset) {
          $sticky.css({ position: 'fixed', top: stickOffset });
      } else {
          $sticky.css({position: 'absolute', top: 'initial'});
      }

      var scrollDistance = $(window).scrollTop();
      

    $('.page-section').each(function(i) {
        if ($(this).position().top - 150 <= scrollDistance) {
            $('.navigation a.active').removeClass('active');
            $('.navigation a').eq(i).addClass('active');
        }
    });

    });

    
  }
});

// Jump Between Sections

$(document).ready(function() {
  $('a[href*=#]').bind('click', function(e) {
      e.preventDefault(); // prevent hard jump, the default behavior

      var target = $(this).attr("href"); // Set the target as variable

      // perform animated scrolling by getting top-position of target-element and set it as scroll target
      $('html, body').stop().animate({
          scrollTop: $(target).offset().top -150
      }, 0, function() {
          
      });

      return false;
  });
});

// Case Study Filter 

$("#filters :checkbox").on('change', function() {

  if ($('input[type=checkbox]').is(":checked")) {
    $('.current-filter').show();
    var re = new RegExp($("#filters :checkbox:checked").map(function() {
      return this.value;
      
        }).get().join("|") );
  
      $(".filter-item").each(function() {
      var $this = $(this);
      $this[re.source!="" && re.test($this.data("id")) ? "show" : "hide"]();
      });
  }
  else {
  //none is checked
  $('.filter-item').css('display', 'inline-block');;
  $('.filter-control').hide();
  }
});

// Remove Filter Item

$('.filter-control').click(function() {
  var $this = $(this);
  
  $('#filter-' + $this.data("id")).prop('checked', false);
  $('.current-filter').show();
  if ($('input[type=checkbox]').is(":checked")) {
    var re = new RegExp($("#filters :checkbox:checked").map(function() {
      return this.value;
      
        }).get().join("|") );
  
      $(".filter-item").each(function() {
      var $this = $(this);
      $this[re.source!="" && re.test($this.data("id")) ? "show" : "hide"]();
      });
  }
  else {
    $('.filter-item').css('display', 'inline-block');;
    $('.filter-control').hide();
    
  }
});

