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
    let head = document.getElementsByTagName('head')[0];
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
table.F.cf.zt tbody {
    display: flex;
    flex-direction: column-reverse;
}    
    `;
    head.appendChild(style);
    console.log('GMail Oldest First applied style');
})();