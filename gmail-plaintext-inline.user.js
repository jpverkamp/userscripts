// ==UserScript==
// @name         Gmail plaintext inline
// @namespace    https://blog.jverkamp.com
// @version      0.1
// @description  Inline plaintext attachments
// @author       JP Verkamp
// @match        https://mail.google.com/mail/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

/* jshint -W097 */
'use strict';

var DEBUG_MODE = false;

var delayedEvent = function(f, timeout, retries) {
    timeout = timeout || 0;
    retries = retries || 0;

    return function(evt) {
        setTimeout(f, timeout, evt, retries, timeout * 2);
    }
};

var checkForPlaintexts = function(evt, retries, delay) {
    retries = retries || 0;

    if (window.location.hash == '#inbox') {
        return;
    }

    if (DEBUG_MODE) console.log('GPTI: checking for plaintext attachments on: ' + window.location.hash);
    var foundOne = false;

    jQuery('span[download_url]').each(function(i, el) {
        if (DEBUG_MODE) console.log('GPTI: loading attachment ' + i);
        foundOne = true;

        var parts = el.getAttribute('download_url').split(':');
        if (!parts || parts[0] != 'text/plain') return;
        var url = parts[3];

        var newElement = jQuery('<pre id="GPTI_' + i + '"></pre>');
        newElement.text('Loading: ' + url);

        jQuery(el).replaceWith(newElement);
        jQuery.ajax({
            url: url,
            success: function(data) {
                newElement.text(data);
            }
        });
    });

    if (!foundOne && retries) {
        if (DEBUG_MODE) console.log('GPTI: no attachments found, retrying ' + retries + ' more times');
        setTimeout(checkForPlaintexts, delay, evt, retries - 1, delay * 2);
    }
};

jQuery(window).bind('hashchange', delayedEvent(checkForPlaintexts, 125, 3));
jQuery(delayedEvent(checkForPlaintexts, 125, 3));
