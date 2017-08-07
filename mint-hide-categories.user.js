// ==UserScript==
// @name         Hide Mint Categories
// @namespace    https://blog.jverkamp.com/
// @version      0.1
// @description  Hide all top level categories from Mint except Misc
// @author       JP Verkamp
// @match        https://mint.intuit.com/*
// @grant        none
// ==/UserScript==

/* jshint -W097 */
'use strict';

(function() {
    setInterval(function() {
        jQuery('#menu-category li.isL1:not(#menu-category-70)').hide();
    });
})();
