/***********************************************************  
 *  Name: Gregory James Caldwell Jr.                       *
 *  Email: Gregory_Caldwell@student.uml.edu                *
 *  File: Autocomplete.js                                  *
 *  Starting Date: Thursday February 12th, 2014            *
 *  Last Date: Monday April 25th, 2014                     *
 *  Course: 91.462 - GUI Programming II                    *
 ***********************************************************/

$(function() {    
  var json = (function () {
    var json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': '../final/database/data/card_search.json',
      'dataType': "json",
      'success': function (data) {
          json = data;
      }
    });
    return json;
  })(); 
  $( "#search" ).autocomplete({
    source: json,
  minLength: 3
  });
});