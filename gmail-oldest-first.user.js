// ==UserScript==
// @name         GMail Oldest First
// @namespace    https://blog.jverkamp.com/
// @version      0.1
// @description  Display emails in Gmail oldest first (per page)
// @author       JP Verkamp
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

/* jshint -W097 */
'use strict';

(function() {
    var attemptReverse = () => {
        var reversed = false;
        document.querySelectorAll('tbody').forEach((el) => {
            if (el.childElementCount < 10) {
                return;
            }
            
            el.setAttribute('style', 'display:flex; flex-direction:column-reverse;');
            reversed = true;
            console.log('GMail Oldest First: Done');
        });

        if (!reversed) {
            setTimeout(attemptReverse, 100);
        }
    };
    setTimeout(attemptReverse, 100);
})();
