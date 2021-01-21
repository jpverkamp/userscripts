// ==UserScript==
// @name         GMail Oldest First
// @namespace    https://blog.jverkamp.com/
// @version      0.2
// @description  Display emails in Gmail oldest first (per page)
// @author       JP Verkamp
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

/* jshint -W097 */
'use strict';

(function() {
    let attemptReverse = () => {
        let reversed = false;
        document.querySelectorAll('tbody').forEach((el) => {
            if (el.childElementCount < 10 || el.getAttribute('style')) {
                return;
            }
            
            el.setAttribute('style', 'display: flex; flex-direction: column-reverse;');
            reversed = true;
            console.log('GMail Oldest First: Reverse applied');
        });

        if (reversed) {
            setTimeout(attemptReverse, 10000);
        } else {
            setTimeout(attemptReverse, 100);
        }
    };
    setTimeout(attemptReverse, 100);
})();
