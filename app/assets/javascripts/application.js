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
  if(/case-studies/.test(loc)) {
    $('#case-studies').addClass('govuk-header__navigation-item--active');
  }
  if (/about/.test(loc)) {
    $('#about').addClass('govuk-header__navigation-item--active');
  }
});