// ==UserScript==
// @name         Gmail reverse order button
// @namespace    https://blog.jverkamp.com/
// @version      0.1
// @description  Add a button to gmail to reverse the order of emails
// @author       JP Verkamp
// @match        https://mail.google.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js
// ==/UserScript==

/* jshint -W097 */
'use strict';

$(function() {
    var $reverseButton = $('<a id="reverseButton" href="#">REVERSE</a>');
    $reverseButton.css({
        'display': ' inline-block',
        'background': 'white',
        'color': 'black',
        'border': '1px solid black',
        'border-radius': '3px',
        'position': 'absolute',
        'top': '70px',
        'left': '90px',
        'width': '55px',
        'height': '27px',
        'z-index': '1500',
        'text-align': 'center',
        'vertical-align': 'middle',
        'line-height': '27px',
        'font-size': '10px',
    });
    $reverseButton.click(function() {
        $("table").each(function(i, el) {
            var arr = $.makeArray(jQuery("tr", this).detach());
            arr.reverse();
            $(this).append(arr);
        });
    });

    var addButton = function() {
        if ($('#reverseButton').length) {
        } else if ($('div:contains("More")').length) {
            $('body').append($reverseButton);
        } else {
            setTimeout(addButton, 1000);
        }
    };
    setTimeout(addButton, 1000);
});
