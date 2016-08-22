// ==UserScript==
// @name         Gmail plaintext inline
// @namespace    https://blog.jverkamp.com
// @version      0.1
// @description  Inline plaintext attachments
// @author       JP Verkamp
// @match        https://mail.google.com/mail/u/*
// @grant        none
// ==/UserScript==

/* jshint -W097 */
'use strict';

var DEBUG_MODE = false;

var delayedEvent = function(f, timeout, retries) {
    timeout = timeout || 0;
    retries = retries || 0;

    return function(evt) {
        setTimeout(f, timeout, evt, retries, timeout * 2);
    };
};

var checkForPlaintexts = function(evt, retries, delay) {
    retries = retries || 0;

    if (window.location.hash == '#inbox') {
        return;
    }

    if (DEBUG_MODE) console.log('GPTI: checking for plaintext attachments on: ' + window.location.hash);

    var download_urls = document.querySelectorAll('span[download_url]');
    if (download_urls.length > 0) {
        for (var i = 0; i < download_urls.length; i++) {
            var el = download_urls[i];
            var parts = el.getAttribute('download_url').split(':');

            if (!parts || parts[0] != 'text/plain') return;
            var url = parts[3];

            var new_el = document.createElement("span");
            new_el.setAttribute('id', 'GPTI_' + i);
            new_el.innerText = 'Loading: ' + url;
            el.parentNode.replaceChild(new_el, el);

            var ajax = new XMLHttpRequest();
            ajax.open('GET', url);
            ajax.onreadystatechange = function() {
                if (ajax.readyState == XMLHttpRequest.DONE) {
                    if(ajax.status == 200){
                        new_el.innerText = ajax.responseText;
                    } else {
                        new_el.innerText = 'Error fetching ' + url + ': ' + ajax.statusText;
                    }
                }
            };
            ajax.send();
        }
    } else if(retries) {
        if (DEBUG_MODE) console.log('GPTI: no attachments found, retrying ' + retries + ' more times');
        setTimeout(checkForPlaintexts, delay, evt, retries - 1, delay * 2);
    }
};

window.addEventListener('hashchange', delayedEvent(checkForPlaintexts, 125, 3));
delayedEvent(checkForPlaintexts, 125, 3)();

if (DEBUG_MODE) console.log('GPTI: LOADED');
