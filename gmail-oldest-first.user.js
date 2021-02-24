// ==UserScript==
// @name         GMail Oldest First
// @namespace    https://blog.jverkamp.com/
// @version      0.2
// @description  Display emails in Gmail oldest first (per page)
// @author       JP Verkamp
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

// Warning, this will break if (when) GMail changes their class names

/* jshint -W097 */
'use strict';

(function() {
    const CLASS_NAME = 'gmail-oldest-first';
    const MESSAGE_LIST_QUERY = 'table.F.cf.zt tbody';

    function toggle() {
        console.log('Gmail Oldest First: Toggle');
        document.querySelectorAll(MESSAGE_LIST_QUERY).forEach((el) => {
            el.classList.toggle(CLASS_NAME);
        });
    }

    let head = document.getElementsByTagName('head')[0];
    let style = document.createElement('style');
    style.id = 'gmail-oldest-first';
    style.type = 'text/css';
    style.innerHTML = `
.${CLASS_NAME} {
    display: flex !important;
    flex-direction: column-reverse;
}
    `;
    head.appendChild(style);
    console.log('GMail Oldest First: Applied style');

    // Run once to reverse by default
    toggle();

    // Bind to Ctrl-R to reverse 
    document.addEventListener('keyup', (event) => {
        if (event.ctrlKey && event.key == 'r') {
            toggle();
        }
    });
})();