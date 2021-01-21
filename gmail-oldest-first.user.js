// ==UserScript==
// @name         GMail Oldest First
// @namespace    https://blog.jverkamp.com/
// @version      0.1
// @description  Display emails in Gmail oldest first (per page)
// @author       JP Verkamp
// @match        https://mail.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
tbody {
    display: flex !important;
    flex-direction: column-reverse;
}
`);